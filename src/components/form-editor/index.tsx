"use client";
import { FormControl, FormHelperText } from "@mui/material";
import { ContentState, EditorState, Modifier, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import dynamic from "next/dynamic";
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useController, useFormContext, useWatch } from "react-hook-form";
import { COLORS } from "../../theme";
import { useTranslation } from "../../i18n";
import { FormTypes } from "../../types";

const MAX_CHARACTERS = 5000;

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);
const getCleanText = (html: string) => {
  const plainText = html?.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags
  return plainText?.replace(/&nbsp;/g, " ")?.replace(/\u00A0/g, " "); // Normalize spaces
};

const toolbarStyleObject = {
  padding: "14px",
  borderRadius: "4px 4px 0px 0px",
  marginBottom: "0px",
};

const FormEditor = ({
  rules,
  name = "description",
  placeholder,
  labelSuffix = "",
  charLimit = MAX_CHARACTERS,
  minHeight = "200px",
  required = true,
  ...props
}: FormTypes) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { control } = useFormContext();

  const preFilledDescription = useWatch({ control, name });
  const {
    field: { onChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      ...rules,
      validate: (value: string) => {
        if (!required) return true;
        const cleanedTextLength = getCleanText(value)?.trim().length;
        if (cleanedTextLength === 0) {
          return "description_required_error";
        } else if (cleanedTextLength > charLimit + 1) {
          return "description_max_length_error";
        }
        return true;
      },
    },
  });

  const charCount = useMemo(
    () => editorState.getCurrentContent().getPlainText()?.trim().length,
    [editorState]
  );

  useEffect(() => {
    const isEditorEmpty =
      editorState.getCurrentContent().getPlainText().trim().length === 0;
    if (preFilledDescription && isEditorEmpty) {
      // Convert HTML string to ContentState
      const blocksFromHTML = convertFromHTML(preFilledDescription);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      // Set EditorState with the converted ContentState
      setEditorState(EditorState.createWithContent(contentState));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preFilledDescription]);

  const handleChange = useCallback(
    (newState: EditorState) => {
      const currentContent = newState.getCurrentContent();
      const plainText = currentContent.getPlainText();

      if (plainText.length <= charLimit) {
        setEditorState(newState);
        const htmlVersion =
          plainText.trim().length > 0 ? stateToHTML(currentContent) : "";
        onChange(htmlVersion);
        return;
      }

      // Prevent exceeding character limit while keeping cursor position
      const selection = newState.getSelection();
      const limitedContent = Modifier.replaceText(
        editorState.getCurrentContent(),
        selection.merge({
          anchorOffset: charLimit,
          focusOffset: plainText.length,
        }),
        ""
      );

      const newEditorState = EditorState.push(
        editorState,
        limitedContent,
        "remove-range"
      );
      setEditorState(newEditorState);
      const htmlVersion =
        newEditorState.getCurrentContent().getPlainText().trim().length > 0
          ? stateToHTML(currentContent)
          : "";
      onChange(htmlVersion);
    },
    [charLimit, editorState, onChange]
  );

  const handlePastedText = useCallback(
    (text: string) => {
      const currentContent = editorState.getCurrentContent();
      const plainText = currentContent.getPlainText();
      const availableSpace = charLimit - plainText.length;

      if (availableSpace <= 0) {
        return true; // Block pasting if at limit
      }

      const truncatedText = text.slice(0, availableSpace);
      const selection = editorState.getSelection();
      const contentState = Modifier.replaceText(
        currentContent,
        selection,
        truncatedText
      );

      const newEditorState = EditorState.push(
        editorState,
        contentState,
        "insert-characters"
      );
      setEditorState(newEditorState);
      const htmlVersion =
        newEditorState.getCurrentContent().getPlainText().trim().length > 0
          ? stateToHTML(newEditorState.getCurrentContent())
          : "";
      onChange(htmlVersion);

      return true;
    },
    [charLimit, editorState, onChange]
  );

  const wrapperStyle = useMemo(() => {
    return {
      ".wrapper-class": {
        ...(props.disabled
          ? {}
          : {
              borderRadius: "4px",
              border: `1px solid ${COLORS.SECONDARY.BUTTON.BG_BORDER}`,
              "&:hover": {
                border: `1px solid ${COLORS.PRIMARY[900]}`,
                borderRadius: "4px",
              },
            }),
      },
    };
  }, [props.disabled]);

  const editorStyleObject = useMemo(() => {
    return {
      minHeight,
      backgroundColor: COLORS.WHITE,
      padding: props.padding ? props.padding : "14px ",
      borderRadius: "0px 0px 4px 4px",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "24px",
      color: COLORS.BLACK,
      ...{
        maxHeight: props.maxHeight,
        ...(props.borderBottomLeftRadius
          ? { borderBottomLeftRadius: props.borderBottomLeftRadius }
          : {}),
        ...(props.borderBottomRightRadius
          ? { borderBottomRightRadius: props.borderBottomRightRadius }
          : {}),
        ...(props.borderTopLeftRadius
          ? { borderTopLeftRadius: props.borderTopLeftRadius }
          : {}),
        ...(props.borderTopRightRadius
          ? { borderTopRightRadius: props.borderTopRightRadius }
          : {}),
      },
    };
  }, [
    minHeight,
    props.borderBottomLeftRadius,
    props.borderBottomRightRadius,
    props.borderTopLeftRadius,
    props.borderTopRightRadius,
    props.maxHeight,
    props.padding,
  ]);

  const charCounterStyle = useMemo((): CSSProperties => {
    return {
      position: "absolute",
      bottom: "14px",
      right: "12px",
      fontSize: "12px",
      color: COLORS.GREY[600],
    };
  }, []);

  const handleReturn = useCallback(
    (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      e: { ctrlKey: any; key: string; preventDefault: () => void },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      editorState: { getCurrentContent: () => any }
    ) => {
      const currentContent = editorState.getCurrentContent();
      const isEmpty =
        !currentContent.hasText() &&
        currentContent.getBlockMap().size === 1 &&
        currentContent.getFirstBlock().getType() === "unstyled";

      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        // Handle Ctrl + Enter key press here
        return true;
      } else if (e.key === "Enter" && isEmpty) {
        // Handle Enter key press only if the editor is empty
        return true;
      }
      return false;
    },
    []
  );
  const { t } = useTranslation("common-err-messages");

  const errorView = useMemo(() => {
    return (
      <FormHelperText
        style={
          error?.message?.trim() != ""
            ? { paddingTop: 4, paddingBottom: 10, fontSize: 10 }
            : {}
        }
      >
        {error
          ? t(`${error.message}`, {
              charLimit,
            })
          : " "}
      </FormHelperText>
    );
  }, [charLimit, error, t]);

  return (
    <FormControl
      error={Boolean(error?.message?.trim())}
      fullWidth
      sx={wrapperStyle}
    >
      <Editor
        data-testid={`${name}-editor-field`}
        editorRef={ref}
        editorState={editorState}
        placeholder={placeholder ? `${placeholder}${labelSuffix}` : ""}
        onEditorStateChange={(e) => handleChange(e)}
        handleReturn={handleReturn}
        handlePastedText={handlePastedText}
        toolbarStyle={toolbarStyleObject}
        editorStyle={editorStyleObject}
        wrapperClassName="wrapper-class"
        toolbarHidden={props.toolbarHidden ? props.toolbarHidden : false}
      />
      {charLimit != null && (
        <span style={charCounterStyle}>
          {charCount}/{charLimit}
        </span>
      )}
      {!!error && errorView}
    </FormControl>
  );
};

export default FormEditor;

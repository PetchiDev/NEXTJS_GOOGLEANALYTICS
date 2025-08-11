import React, { memo } from "react";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import { IconButton, Stack } from "@mui/material";

interface CustomToolTipProp {
  handleDeleteImage: (index: number) => void;
  handleEditImage: (index: number) => void;
  index: number;
  preview: string | undefined;
  isProfile?: boolean;
  toolTipWidth?: string | number;
}
const CustomToolTip: React.FC<CustomToolTipProp> = ({
  handleDeleteImage,
  handleEditImage,
  index,
  preview,
  isProfile = false,
  toolTipWidth = "120px",
}) => {
  return (
    <Stack
      direction="row"
      sx={{
        borderRadius:
          "var(--radius-none, 0px) var(--radius-none, 0px) var(--radius-xs, 4px) var(--radius-xs, 4px)",
        background: "rgba(0, 0, 0, 0.70)",
        color: "white",
        width: toolTipWidth,
        height: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        opacity: 1,
        zIndex: 998,
      }}
    >
      <IconButton
        color="inherit"
        onClick={(e) => {
          handleDeleteImage(index);
          e.stopPropagation();
        }}
      >
        <Delete sx={{ fontSize: 11 }} />
      </IconButton>
      {!preview || isProfile ? (
        <IconButton color="inherit" onClick={() => handleEditImage(index)}>
          <Edit sx={{ fontSize: 11 }} />
        </IconButton>
      ) : null}
    </Stack>
  );
};

export default memo(CustomToolTip);

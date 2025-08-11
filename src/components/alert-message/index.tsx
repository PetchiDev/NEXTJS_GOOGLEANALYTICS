"use client";

import { SuccessIcon, WarningIcon } from "../../icons";
import { COLORS } from "../../theme";
import { AlertTitle, Snackbar } from "@mui/material";
import Alert, { AlertProps } from "@mui/material/Alert";
import React, {
  SyntheticEvent,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

interface AlertMessageProps {
  message?: string;
  title?: string;
  timeout?: number;
  severity: AlertProps["severity"];
  id?: string;
}
export interface AlertMessageRef {
  showAlert: (arg: AlertMessageProps) => void;
}

const AlertMessageComp = forwardRef<AlertMessageRef, Omit<AlertProps, "severity">>(
  function AlertMessage(props, ref) {
    const { variant = "filled", ...rest } = props;
    const [alerts, setAlerts] = useState<AlertMessageProps[]>([]); // State to hold individual alerts

    useEffect(() => {
      // Create timeout IDs for each alert
      const timeoutIds = alerts.map((alert) =>
        setTimeout(() => {
          closeAlert(alert.id); // Use unique ID for closing
        }, alert.timeout)
      );

      // Clear timeouts on component unmount or alert update
      return () => timeoutIds.forEach((id) => clearTimeout(id));
    }, [alerts]);

    const closeAlert = (id?: string) => {
      if (id)
        setAlerts((prevAlerts) =>
          prevAlerts.filter((alert) => alert.id !== id)
        );
    };

    useImperativeHandle(
      ref,
      () => ({
        showAlert({
                    message = "",
                    title = "",
                    timeout = 3000,
                    severity = "success",
                  }) {
          // Generate unique ID for each alert
          const id = Math.random().toString(36).substring(2, 15);

          // Add new alert with unique ID
          setAlerts((prevAlerts) => [
            ...prevAlerts,
            { id, message, title, timeout, severity },
          ]);
        },
      }),
      []
    );

    return (
      <>
        {alerts.map((alert, index) => (
          <Snackbar
            key={alert.id} // Use unique ID for key
            open={true} // Always open for individual alerts
            autoHideDuration={alert.timeout}
            onClose={(event: SyntheticEvent | Event, reason: string) => {
              if (reason === "timeout") {
                closeAlert(alert.id);
              }
            }}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            style={{ marginTop: index * 72 }} // Adjust margin for vertical spacing
            sx={{
              top: { xs: 0, md: 24 },
              right: { xs: 0, md: 24 },
              minWidth: "300px",
            }}
          >
            <Alert
              onClose={(event?: SyntheticEvent | Event, reason?: string) => {
                if (reason === "timeout") {
                  closeAlert(alert.id);
                }
              }}
              severity={alert.severity}
              variant={variant}
              icon={
                alert.severity === "error" || alert.severity === "warning" ? (
                  <WarningIcon size={40} />
                ) : (
                  <SuccessIcon size={40} />
                )
              }
              {...rest}
              sx={{
                width: { xs: "100%", md: "400px" },
                background: COLORS.WHITE,
                color: COLORS.GREY[700],
                borderLeft: `4px solid ${
                  alert.severity === "error" || alert.severity === "warning"
                    ? COLORS.WARNING.BG_WARNING_SECONDARY
                    : COLORS.GOOD_DEAL
                }`,
                marginTop: index * 2,
                ...(rest.sx ?? {}),
              }}
            >
              {alert.title ? (
                <AlertTitle sx={{ color: COLORS.GREY[900] }}>
                  {alert.title}
                </AlertTitle>
              ) : null}
              {alert.message}
            </Alert>
          </Snackbar>
        ))}
      </>
    );
  }
);

export const AlertMessage = memo(AlertMessageComp);

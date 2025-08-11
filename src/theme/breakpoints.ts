import { BreakpointsOptions } from "@mui/material";
import { config, MODULE } from "../constants";
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

export const BREAKPOINTS: BreakpointsOptions = {
  values: {
    xs: 0, // 0 and above
    sm: config.app_name === MODULE.VEHICLES ? 600 : 320, // 320px and above
    md: 640, // 640px and above
    lg: 1007, // 1007px and above
    xl: 1200, // 1200px and above
    xxl: 1366, // 1366px and above
  },
};

"use-client";
import { languages } from "@/i18n";
import { config } from "@/constants/common-config";
import { ReactQueryClientProvider, NetworkStatusProvider, AlertProvider } from "@/context";
import { theme } from "@/theme";
import { COLORS } from "@/theme/colors";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { GoogleAnalytics } from "@next/third-parties/google";
import { dir } from "i18next";
import { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { PublicEnvScript } from 'next-runtime-env';

export const metadata: Metadata = {
  title: "Qatar Living",
  description: "The go-to place for lifestyle, news and events",
};
export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: "device-width",
};
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export interface RootLayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}
const RootLayout = async (
  props: Readonly<RootLayoutProps>
) => {
  const { children, params: paramsPromise } = props;
  const params = await paramsPromise;
  const lng = params.lng;

  const enableGameBall = process.env.NEXT_PUBLIC_ENABLE_GAMEBALL === "true";

  const GameballWidget = enableGameBall
    ? dynamic(() => import("@/components/gameball"), {
        ssr: true,
      })
    : () => null;

  return (
    <html lang={lng} dir={dir(lng)} style={{ height: "100%" }}>
      <head>
        <PublicEnvScript />
      </head>
      <body>
        <AlertProvider>
          <ReactQueryClientProvider>
            <AppRouterCacheProvider options={{ key: "css" }}>
              <ThemeProvider theme={theme}>
                <NetworkStatusProvider>
                  <CssBaseline />
                  <Box
                    component={"section"}
                    sx={{
                      flex: "1 0 auto",
                      bgcolor: COLORS.SECONDARY.BUTTON.BODY_BG,
                    }}
                  >
                    {children}
                  </Box>
                </NetworkStatusProvider>
                {enableGameBall && <GameballWidget />}
              </ThemeProvider>
            </AppRouterCacheProvider>
          </ReactQueryClientProvider>
        </AlertProvider>
      </body>
      {config.google_analytics_id && (
        <GoogleAnalytics gaId={config.google_analytics_id} />
      )}
    </html>
  );
};

export default RootLayout;

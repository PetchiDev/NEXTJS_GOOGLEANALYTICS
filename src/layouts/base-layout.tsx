"use client";

import { COLORS } from "@/theme";
import { Footer, Header, ScrollToTop } from "@/components";
import NextTopLoader from "nextjs-toploader";
import { FC } from "react";

interface BaseLayoutProps {
  children: React.ReactNode;
  isHeaderStretched?: boolean;
  isFooterShown?: boolean;
  showScrollToTop?: boolean;
}
const BaseLayout: FC<BaseLayoutProps> = ({
  children,
  isFooterShown = true,
  isHeaderStretched,
  showScrollToTop = true,
}) => {
  return (
    <>
      <Header isStretched={isHeaderStretched} />
      <NextTopLoader
        color={COLORS.SECONDARY.MAIN}
        showAtBottom={false}
        height={4}
        showSpinner={false}
        speed={200}
      />
      {children}
      {isFooterShown && <Footer />}
      {showScrollToTop && <ScrollToTop />}
    </>
  );
};

export default BaseLayout;

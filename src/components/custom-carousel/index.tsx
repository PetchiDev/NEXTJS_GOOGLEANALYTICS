"use client";
import React from "react";
import { IBanner } from "../../types";
import { COLORS, theme } from "../../theme";
import { Box, styled, useMediaQuery } from "@mui/material";
import {
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import Carousel, { CarouselInternalState } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Import styles for react-multi-carousel
import sample from "lodash/sample";
import HeroImage from "./hero-image";
import { ANALYTIC_TYPE } from "../../constants";
import { useQLAnalytics } from "../../api";

type CustomCarouselProps = {
  banner: IBanner;
  bottomSpacing?: number;
};

const IndicatorsContainer = styled(Box)<{ bottomSpacing: number }>(
  ({ bottomSpacing }) => ({
    position: "absolute",
    bottom: bottomSpacing,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "5px",
    zIndex: 3,
  })
);

const Indicator = styled("div")<{ active: boolean }>(({ active }) => ({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: active ? COLORS.PRIMARY.MAIN : "#D9D9D9",
  transition: "background-color 0.3s",
}));

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

interface IndicatorsProps {
  bottomSpacing: number;
  total: number;
  onIndicatorClick?: (index: number) => void;
  initialIndex?: number;
}

interface IndicatorsRef {
  next: () => number;
  setActiveIndex: (index: number) => void;
}

const DotIndicators = forwardRef<IndicatorsRef, IndicatorsProps>(
  ({ bottomSpacing, total, onIndicatorClick, initialIndex = 0 }, ref) => {
    const [activeIndex, setActiveIndex] = useState(initialIndex);

    useImperativeHandle(ref, () => ({
      next: () => {
        const nextIndex = (activeIndex + 1) % total;
        setActiveIndex(nextIndex);
        return nextIndex;
      },
      setActiveIndex: (index: number) => {
        setActiveIndex(index);
      },
    }));

    const handleIndicatorClick = (index: number) => {
      setActiveIndex(index);
      if (onIndicatorClick) {
        onIndicatorClick(index);
      }
    };

    if (total <= 1) {
      return null;
    }

    return (
      <IndicatorsContainer bottomSpacing={bottomSpacing}>
        {Array.from({ length: total }).map((_, i) => (
          <Indicator
            key={`carousel-dot-${i}`}
            active={i === activeIndex}
            onClick={() => handleIndicatorClick(i)}
          />
        ))}
      </IndicatorsContainer>
    );
  }
);

DotIndicators.displayName = "DotIndicators";

const CustomCarousel: FC<CustomCarouselProps> = ({
  banner = { images: [] } as unknown as IBanner,
  bottomSpacing = 8,
}) => {
  const carouselRef = useRef<Carousel | null>(null);
  const dotIndicatorsRef = useRef<IndicatorsRef | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { mutate: callQLAnalytics } = useQLAnalytics();
  const isRandom = banner.rotation === "random";
  const bannerImages = useMemo(
    () => banner.images.filter(b => isMobile ? b.isMobile : b.isDesktop),
    [isMobile, banner.images],
  )

  const handleAnalytics = useCallback(
    (bannerSlot: string) => {
      callQLAnalytics({
        analyticType: ANALYTIC_TYPE.BANNER_CLICK,
        banner: bannerSlot,
      });
    },
    [callQLAnalytics]
  );

  const clearAutoPlayTimer = () => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  };

  const setNextSlideTimer = useCallback(
    (_?: number, state?: CarouselInternalState) => {
      // Default total + 2 due to infinite true
      const { currentSlide = bannerImages.length + 2 } = state || {};
      clearAutoPlayTimer();

      // Get the real index due to infinite it adds 2 more at start and end
      let realIndex = 0
      if (currentSlide === bannerImages.length + 2) {
        realIndex = 0;
      } else if (
        currentSlide === bannerImages.length + 1 ||
        currentSlide === 1
      ) {
        realIndex = bannerImages.length - 1;
      } else if (
        currentSlide === bannerImages.length ||
        currentSlide === 0
      ) {
        realIndex = bannerImages.length - 2;
      } else {
        realIndex = currentSlide - 2;
      }
      dotIndicatorsRef.current?.setActiveIndex(realIndex);
      const currentBanner = bannerImages[realIndex];
      const duration = currentBanner?.duration || 5; // Default to 5 seconds if duration not provided

      autoPlayTimerRef.current = setTimeout(() => {
        if (carouselRef.current) {
          // Move to next slide
          carouselRef.current.next(0);
        }
      }, duration * 1000);
    },
    [bannerImages]
  );

  const goToSlide = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.goToSlide(index + 2);
    }
  };

  const singleImage = useMemo(() => {
    if (isRandom) {
      return sample(bannerImages);
    }
    if (bannerImages.length === 1) {
      return bannerImages[0];
    }
  }, [bannerImages, isRandom]);

  useEffect(() => {
    if (!singleImage) {
      setNextSlideTimer();
    }
    if (bannerImages.length) {
      // Need to trigger view analytics for banners
      callQLAnalytics({
        analyticType: ANALYTIC_TYPE.VIEW_BANNER_IMPRESSION,
        banner: singleImage
          ? singleImage.analytics_slot
          : bannerImages.map((i) => i.analytics_slot).filter((a) => Boolean(a)),
      });
    }
    return () => {
      clearAutoPlayTimer();
    };
    // Trigger this on only mount and unmount and image change - this code should be refactored
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleImage]);

  if (bannerImages?.length === 0) {
    return null;
  }

  if (singleImage) {
    return (
      <HeroImage
        showTitle
        banner={banner}
        image={singleImage}
        onClick={handleAnalytics}
      />
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: isMobile
          ? banner.dimensions.width_mobile
          : banner.dimensions.width_desktop,
        height: isMobile
          ? banner.dimensions.height_mobile
          : banner.dimensions.height_desktop,
      }}
    >
      <Carousel
        ref={carouselRef}
        autoPlay={false}
        swipeable={bannerImages.length > 1}
        draggable={bannerImages.length > 1}
        showDots={false}
        responsive={responsive}
        infinite
        transitionDuration={400}
        renderDotsOutside={false}
        minimumTouchDrag={10}
        afterChange={setNextSlideTimer}
        customLeftArrow={<></>}
        customRightArrow={<></>}
      >
        {bannerImages.map((image, index) => (
          <HeroImage
            key={`banner_${index}`}
            banner={banner}
            image={image}
            onClick={handleAnalytics}
          />
        ))}
      </Carousel>
      <DotIndicators
        ref={dotIndicatorsRef}
        bottomSpacing={bottomSpacing}
        total={bannerImages.length}
        onIndicatorClick={goToSlide}
      />
    </Box>
  );
};

export default CustomCarousel;

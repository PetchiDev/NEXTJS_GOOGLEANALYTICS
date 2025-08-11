"use client";

import React from "react";
import {
  Box,
  Typography,
  Skeleton,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Link from "next/link";

interface FeaturedEvent {
  id: string;
  title?: string;
  image_url: string;
  slug?: string;
}

interface FeaturedEventsProps {
  featuredEvents: FeaturedEvent[];
  loading: boolean;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};

const FeaturedEvents: React.FC<FeaturedEventsProps> = ({
  featuredEvents,
  loading,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const skeletonCount = isMobile ? 2 : 6;
  const centerItems = featuredEvents.length <= 5;

  return (
    <Box mt={6} mb={8}>
      <style jsx>{`
        .react-multi-carousel-dot button {
          background: #ccc;
        }
        .react-multi-carousel-dot--active button {
          background: #000;
        }
      `}</style>

      <Typography variant="h6" mb={3} textAlign="center" fontWeight={600}>
        Featured Events
      </Typography>

      <Box className="carousel-wrapper">
        {loading ? (
          <Grid container spacing={2} justifyContent="center">
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <Grid item key={index}>
                <Box p={1} width={181.67}>
                  <Skeleton
                    variant="rectangular"
                    width={182}
                    height={200}
                    sx={{ borderRadius: 2 }}
                  />
                  <Skeleton width="90%" sx={{ mt: 1 }} />
                  <Skeleton width="70%" />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : centerItems ? (
          <Grid container spacing={2} justifyContent="center">
            {featuredEvents.map((event) => (
              <Grid item key={event.id}>
                <Box
                  px={1}
                  textAlign="center"
                  sx={{
                    width: 181.67,
                    height: 205,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Link
                    href={`/content/events/${event.slug ?? event.id}`}
                    passHref
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Box sx={{ cursor: "pointer" }}>
                      <Box
                        sx={{
                          borderRadius: 2,
                          overflow: "hidden",
                          mb: 1.2,
                        }}
                      >
                        <Image
                          src={event.image_url}
                          alt={event.title || "Event Image"}
                          width={182}
                          height={200}
                          style={{
                            width: "182px",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "12px",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{
                          px: 0.5,
                          lineHeight: "1.4",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          cursor: "pointer",
                          transition: "color 0.3s ease",
                          "&:hover": {
                            color: "#00467F",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {event.title}
                      </Typography>
                    </Box>
                  </Link>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Carousel
            responsive={responsive}
            infinite
            swipeable
            draggable
            arrows={false}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-8px"
            customTransition="all .3s ease"
            transitionDuration={300}
          >
            {featuredEvents.map((event) => (
              <Box
                key={event.id}
                px={1}
                textAlign="center"
                sx={{ width: 181.67, height: 205 }}
              >
                <Link
                  href={`/content/events/${event.slug ?? event.id}`}
                  passHref
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Box sx={{ cursor: "pointer" }}>
                    <Box
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        mb: 1.2,
                      }}
                    >
                      <Image
                        src={event.image_url}
                        alt={event.title || "Event Image"}
                        width={182}
                        height={200}
                        style={{
                          width: "182px",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      sx={{
                        px: 0.5,
                        lineHeight: "1.4",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                        transition: "color 0.3s ease",
                        "&:hover": {
                          color: "#00467F",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {event.title}
                    </Typography>
                  </Box>
                </Link>
              </Box>
            ))}
          </Carousel>
        )}
      </Box>
    </Box>
  );
};

export default FeaturedEvents;

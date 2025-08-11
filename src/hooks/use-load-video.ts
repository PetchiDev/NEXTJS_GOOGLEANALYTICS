"use client";
import { useEffect, useMemo, useRef } from "react";
import Hls from "hls.js";
import { config } from "../constants";

export const constructVideoUri = (
  orgSubPath?: string,
  meta?: { hls: string; mp4: string }
) => {
  if (!orgSubPath && !meta) {
    return "";
  }
  if (meta?.hls) {
    return `${config.images_cdn_url}videos-output/${meta.hls}`;
  }
  if (meta?.mp4) {
    return `${config.images_cdn_url}videos-output/${meta.mp4}`;
  }
  return `${config.images_cdn_url}videos/${orgSubPath}`;
};

export const useLoadVideo = (
  orgSubPath?: string,
  meta?: { hls: string; mp4: string }
) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoURL = useMemo(
    () => constructVideoUri(orgSubPath, meta),
    [orgSubPath, meta]
  );

  useEffect(() => {
    if (!videoURL) return;
    const video = videoRef.current;
    if (!video) return;

    if (
      !videoURL.endsWith("m3u8") || // if other than hls just add source
      video.canPlayType("application/vnd.apple.mpegurl") // Native HLS support (Safari)
    ) {
      video.src = videoURL;
    } else if (Hls.isSupported()) {
      // Use hls.js for other browsers
      const hls = new Hls();
      hls.loadSource(videoURL);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(console.error);
      });

      return () => hls.destroy();
    }
  }, [videoURL]);
  return {
    videoRef,
    videoURL,
  };
};

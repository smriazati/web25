"use client";

import dynamic from "next/dynamic";
import type { JSX } from "react";

import styles from "@/styles/VideoPlayer.module.css";
import { VideoProjectVideo } from "@/types/video-project";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
}) as unknown as (props: Record<string, unknown>) => JSX.Element;

const videoUrl = (video: VideoProjectVideo) => {
  if (video.platform === "vimeo") {
    return `https://vimeo.com/${video.id}`;
  }

  return `https://www.youtube.com/watch?v=${video.id}`;
};

interface VideoPlayerProps {
  video: VideoProjectVideo;
}

const VideoPlayer = ({ video }: VideoPlayerProps) => (
  <div className={styles.wrapper}>
    <div className={styles.ratioBox}>
      <ReactPlayer
        url={videoUrl(video)}
        width="100%"
        height="100%"
        controls
        pip={false}
        light={false}
        className={styles.player}
      />
    </div>
    {video.caption && <p className={styles.caption}>{video.caption}</p>}
  </div>
);

export default VideoPlayer;

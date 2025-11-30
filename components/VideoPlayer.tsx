// IframePlayer.tsx
"use client";
import styles from "@/styles/VideoPlayer.module.css";
import { VideoProjectVideo } from "@/types/video-project";

const iframeUrl = (video: VideoProjectVideo) => {
  if (video.platform === "vimeo") {
    return `https://player.vimeo.com/video/${video.id}`;
  }
  return `https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`;
};

interface IframePlayerProps {
  video: VideoProjectVideo;
}

const IframePlayer = ({ video }: IframePlayerProps) => {
  const src = iframeUrl(video);
  return (
    <div className={styles.wrapper}>
      {video.caption && <p className={styles.caption}>
        <span className={styles.captionIcon}>🎥</span>
        <span>{video.caption}</span>
      </p>}
      <div className={styles.ratioBox}>
        <iframe
          src={src}
          title={video.caption || "video"}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default IframePlayer;

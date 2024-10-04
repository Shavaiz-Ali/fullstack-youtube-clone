/* eslint-disable @typescript-eslint/no-explicit-any */
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

// css imports
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

const PlayVideo = ({ item }: any) => {
  if (!item || item.length < 1) return <div>No video available</div>;

  const videoSrc = item[0]?.url;

  console.log("Video source:", videoSrc);

  return (
    <div className="w-full h-full">
      {videoSrc ? (
        <MediaPlayer
          title="Sprite Fight"
          src={"https://www.w3schools.com/html/mov_bbb.mp4"}
          playsInline
          autoPlay={true}
          controls={true}
        >
          {/* Ensure MediaProvider is inside MediaPlayer */}
          <MediaProvider>
            <DefaultVideoLayout
              thumbnails="/images/stream.jpg"
              icons={defaultLayoutIcons}
            />
            
          </MediaProvider>
        </MediaPlayer>
      ) : (
        <div className="text-white">Loading video...</div>
      )}
    </div>
  );
};

export default PlayVideo;

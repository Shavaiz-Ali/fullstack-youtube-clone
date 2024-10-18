/* eslint-disable @typescript-eslint/no-explicit-any */
// import { MediaPlayer, MediaProvider } from "@vidstack/react";
// import {
//   defaultLayoutIcons,
//   DefaultVideoLayout,
// } from "@vidstack/react/player/layouts/default";

// // css imports
// import "@vidstack/react/player/styles/default/theme.css";
// import "@vidstack/react/player/styles/default/layouts/video.css";
import ReactPlayer from "react-player/lazy";
const PlayVideo = ({ item }: any) => {
  // if (!item || item.length < 1) return <div>No video available</div>;

  // const videoSrc = item[0]?.url;

  // console.log("Video source:", item);
  // console.log(item)

  return (
    <div className="w-full h-full border border-gray-50/20 rounded-[8px] overflow-hidden">
      {item ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${item}`}
          width="100%"
          height="100%"
          playing
          controls
          volume={1}
        />
      ) : (
        <div className="text-white">Loading video...</div>
      )}
    </div>
  );
};

export default PlayVideo;

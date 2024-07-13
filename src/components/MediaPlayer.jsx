import { useRef } from "react";
import ReactPlayer from "react-player";

const MediaPlayer = ({
  stream,
  isCurrentUser,
  isVideoEnabled,
  isRemoteUserAudioEnabled,
  isRemoteUserVideoEnabled,
}) => {
  const ref = useRef(null);

  return (isCurrentUser ? isVideoEnabled : isRemoteUserVideoEnabled) ? (
    <ReactPlayer
      ref={ref}
      url={stream}
      muted={isCurrentUser ? true : !isRemoteUserAudioEnabled}
      playing={isCurrentUser ? isVideoEnabled : isRemoteUserVideoEnabled}
      width="100%"
      height="100%"
    />
  ) : (
    <div className="w-full h-full bg-[#000]" />
  );
};

export default MediaPlayer;

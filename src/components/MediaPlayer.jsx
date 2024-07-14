import ReactPlayer from "react-player";

const MediaPlayer = ({ stream, isCurrentUser, isRemoteUserAudioEnabled,className }) => {
  const playerProps = {
    url: stream,
    muted: isCurrentUser ? true : !isRemoteUserAudioEnabled,
    playing: true,
    width: "100%",
    height: "100%",
  };

  return stream ? (
    <ReactPlayer {...playerProps} className={className} />
  ) : (
    <div
      className={`bg-[rgb(32, 33, 36)] pt-[56.35%] w-full  ${className}`}
      style={{
        backgroundColor: "rgb(32, 33, 36)",
        paddingTop: "70%",
        width: "100%",
      }}
    />
  );
};

export default MediaPlayer;
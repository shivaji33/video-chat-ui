import MediaControlButton from "./MediaControlButton";

const VideoToggleButton = (props) => {
    const {isEnabled} = props;
    return <MediaControlButton {...props}>
          <span className="material-symbols-outlined">
              {isEnabled ? "videocam" : "videocam_off"}
            </span>
    </MediaControlButton>
}

export default VideoToggleButton;
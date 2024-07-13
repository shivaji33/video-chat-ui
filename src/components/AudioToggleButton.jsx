import MediaControlButton from "./MediaControlButton";

const AudioToggleButton = (props) => {
    const {isEnabled} = props;
    return <MediaControlButton  {...props}>
          <span className="material-symbols-outlined">
              {isEnabled ? "mic" : "mic_off"}
            </span>
    </MediaControlButton>
}

export default AudioToggleButton;
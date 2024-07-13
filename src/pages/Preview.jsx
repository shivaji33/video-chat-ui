import useMedia from "../hooks/useMedia";
import AudioToggleButton from "../components/AudioToggleButton";
import VideoToggleButton from "../components/VideoToggleButton";
import Modal from "react-modal";
import ImageSlider from "../components/ImageSlider";
import MediaPlayer from "../components/MediaPlayer";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 2px 4px rgba(0,0,0,.075)",
  },
};

const SLIDER_IMAGES = [
  {
    name: "allow-image",
    id: 1,
    url: "https://www.gstatic.com/meet/permissions_flow_allow_ltr_478239240996514edc5a278a3a08fa6f.svg",
  },
  {
    name: "change-control-image",
    id: 2,
    url: "https://www.gstatic.com/meet/permissions_flow_meet_blocked_chrome_page_info_ltr_80ad378597e2a7cc8f65d34f0e0e7b9c.svg",
  },
];

const Preview = () => {
  const {
    accessStatus,
    mediaStream,
    toggleAudio,
    toggleVideo,
    isAudioEnabled,
    isVideoEnabled,
  } = useMedia();

  return (
    <>
      <div className="flex flex-wrap h-screen bg-[#eee] md:items-center px-3">
        <div className="relative m-auto md:w-3/5 sm:w-full bg-[#000]">
          <MediaPlayer
            isCurrentUser={true}
            isVideoEnabled={isVideoEnabled}
            stream={mediaStream}
          />
          <div className="controls_wrapper">
            <div className="controls">
              <AudioToggleButton
                isEnabled={isAudioEnabled}
                onClick={toggleAudio}
              />
              <VideoToggleButton
                isEnabled={isVideoEnabled}
                onClick={toggleVideo}
              />
            </div>
          </div>
        </div>
        <div className="md:w-2/5 w-full md:p-4 flex flex-col text-center items-center md:justify-center">
          <h4 className="text-3xl my-4">Ready to join?</h4>
          <button
            type="button"
            className="py-2 px-4 bg-blue-600 rounded text-white"
          >
            Join Now
          </button>
        </div>
      </div>
      {(accessStatus == "INIT" || accessStatus == "DENIED") && (
        <Modal
          isOpen={true}
          style={customStyles}
          contentLabel="controls-tootool-tip"
        >
          <div className="min-w-[300px] max-w-[400px] text-center p-2">
            <ImageSlider images={SLIDER_IMAGES} />
            <h4 className="mt-2">
              Meeting is blocked from using your camera and mic.{" "}
              <span className="text-2xl">Click Allow</span>
            </h4>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Preview;

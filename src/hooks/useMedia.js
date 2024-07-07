import { useEffect, useState } from "react";

const useMedia = () => {
  const [mediaStream, setMediaStream] = useState(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setMediaStream(stream);
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    getMediaStream();
  }, []);

  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream]);

  const toggleVideo = () => {
    if (mediaStream) {
      const videoTrack = mediaStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoEnabled(videoTrack.enabled);
    }
  };

  const toggleAudio = () => {
    if (mediaStream) {
      const audioTrack = mediaStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioEnabled(audioTrack.enabled);
    }
  };

  return {
    mediaStream,
    toggleVideo,
    toggleAudio,
    isVideoEnabled,
    isAudioEnabled,
  };
};

export default useMedia;

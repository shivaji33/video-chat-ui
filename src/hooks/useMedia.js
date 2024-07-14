import { useCallback, useEffect, useState } from "react";

const useMedia = (initialAudioEnabled = null, initialVideoEnabled = null) => {
  const [mediaStream, setMediaStream] = useState(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(initialVideoEnabled);
  const [isAudioEnabled, setIsAudioEnabled] = useState(initialAudioEnabled);
  const [accessStatus, setAccessStatus] = useState('INIT');

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        setAccessStatus('PENDING');
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setMediaStream(stream);
        setAccessStatus('GRANTED');
        setIsAudioEnabled(true);
        setIsVideoEnabled(true);
      } catch (error) {
        console.error("Error accessing media devices:", error);
        setAccessStatus('DENIED');
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

  const toggleVideo = useCallback(() => {
    if (mediaStream) {
      const videoTrack = mediaStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoEnabled(videoTrack.enabled);
      console.log('Toggle Video');
    }
  }, [mediaStream]);

  const toggleAudio = useCallback(() => {
    if (mediaStream) {
      const audioTrack = mediaStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioEnabled(audioTrack.enabled);
      console.log('Toggle Audio');
    }
  }, [mediaStream]);

  useEffect(() => {
    if (mediaStream) {
      console.log({initialAudioEnabled,isAudioEnabled,isVideoEnabled,initialVideoEnabled});
      if (initialAudioEnabled !== null && isAudioEnabled !== initialAudioEnabled) {
        toggleAudio();
      }
      if (initialVideoEnabled !== null && initialVideoEnabled !== isVideoEnabled) {
        toggleVideo();
      }
    }
  }, [initialAudioEnabled, initialVideoEnabled, isAudioEnabled, isVideoEnabled, mediaStream, toggleAudio, toggleVideo])


  return {
    accessStatus,
    mediaStream,
    toggleVideo,
    toggleAudio,
    isVideoEnabled,
    isAudioEnabled,
  };
};

export default useMedia;

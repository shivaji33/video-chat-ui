import { useNavigate, useParams } from "react-router-dom";
import usePeer from "../hooks/usePeer";
import { useSocket } from "../context/socket";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import useMedia from "../hooks/useMedia";
import NoVideoFallback from "../assets/video-not-working.png";

const Room = () => {
  const { roomId, userName } = useParams();
  const [peer, peerId] = usePeer();
  const socket = useSocket();
  const [streams, setStreams] = useState(new Map());
  const isSingleUser = streams.size === 1;
  const {
    mediaStream: media,
    toggleAudio,
    toggleVideo,
    isAudioEnabled,
    isVideoEnabled,
  } = useMedia();

  const navigate = useNavigate();

  useEffect(() => {
    if (!peerId || !socket || !roomId || !media) return;

    socket.emit("JOIN_ROOM", roomId, peerId, userName);

    const handleUserJoined = (remotePeerId, remoteUserName) => {
      console.log(
        "Remote user joined==> " + remotePeerId + " " + remoteUserName
      );
      const call = peer.call(remotePeerId, media, {
        metadata: { name: userName },
      });

      call.on("stream", (remoteStream) => {
        console.log("Remote stream received ==>", remoteUserName);
        setStreams((prev) =>
          new Map(prev).set(remotePeerId, {
            userName: remoteUserName,
            stream: remoteStream,
            audio: true,
            video: true,
          })
        );
      });
    };

    socket.on("USER_CONNECTED", handleUserJoined);
    return () => {
      socket.off("USER_CONNECTED", handleUserJoined);
    };
  }, [peerId, socket, roomId, peer, media, userName]);

  useEffect(() => {
    if (!peer || !peerId) return;

    const handleCall = (call) => {
      call.answer(media);
      // Remote user Stream
      call.on("stream", (remoteStream) => {
        const remotePeerId = call.peer;
        console.log("Remote stream received (answered call)", remotePeerId);
        const remoteUserName = call.metadata?.name;
        setStreams((prev) =>
          new Map(prev).set(remotePeerId, {
            stream: remoteStream,
            audio: true,
            video: true,
            userName: remoteUserName,
          })
        );
      });
    };

    peer.on("call", handleCall);

    return () => {
      peer.off("call", handleCall);
    };
  }, [media, peer, peerId, streams]);

  useEffect(() => {
    if (!media || !peerId) return;
    setStreams((prev) => {
      return new Map(prev).set(peerId, {
        stream: media,
        audio: true,
        video: true,
        userName,
      });
    });
  }, [media, peerId, userName]);

  const handleToggleAudio = () => {
    socket.emit("TOGGLE_AUDIO", roomId, peerId);
    toggleAudio();
  };

  const handleToggleVideo = () => {
    socket.emit("TOGGLE_VIDEO", roomId, peerId);
    toggleVideo();
  };

  useEffect(() => {
    if (!socket) return;

    const audioHandler = (remotePeerId) => {
      console.log({ remotePeerId }, "TOGGLE_AUDIO ======>");
      setStreams((prevStream) => {
        const peerData = prevStream.get(remotePeerId);
        return new Map(prevStream).set(remotePeerId, {
          ...peerData,
          audio: !peerData.audio,
        });
      });
    };

    const videoHandler = (remotePeerId) => {
      console.log({ remotePeerId }, "TOGGLE_VIDEO ======>");
      setStreams((prevStream) => {
        const peerData = prevStream.get(remotePeerId);
        return new Map(prevStream).set(remotePeerId, {
          ...peerData,
          video: !peerData.video,
        });
      });
    };
    const callEndHandler = (remotePeerId) => {
      setStreams(prev => {
        const updatedStream = new Map(prev);
        updatedStream.delete(remotePeerId);
        return updatedStream;
      });
    }

    socket.on("TOGGLE_AUDIO", audioHandler);
    socket.on("TOGGLE_VIDEO", videoHandler);
    socket.on('CALL_END', callEndHandler)

    return () => {
      socket.off("TOGGLE_AUDIO", audioHandler);
      socket.off("TOGGLE_VIDEO", videoHandler);
      socket.off('CALL_END', callEndHandler)
    };
  }, [socket]);

  const onCallEnd = () => {
    socket.emit('CALL_END',roomId,peerId);
    peer.disconnect();
    navigate('/');
  };

  return (
    <div className="room-container">
      {[...streams.entries()].map(
        ([uniquePeerId, { stream, audio, video, userName }]) => {
          const isCurrentUser = uniquePeerId === peerId;
          const className =
            isCurrentUser && !isSingleUser ? "small-video" : "grid-video";
          return (
            <div key={uniquePeerId} className={className}>
              <p className="absolute top-0 left-0 user-name p-1">{userName}</p>
              {(isCurrentUser ? !isAudioEnabled : !audio) && (
                <div className="absolute top-[7px] right-[7px] p-1 w-[40px] flex items-center justify-center h-[40px] user-name rounded-full">
                  <span className="material-symbols-outlined">mic_off</span>
                </div>
              )}

              {(isCurrentUser ? isVideoEnabled : video) ? (
                <ReactPlayer
                  url={stream}
                  muted={!audio}
                  playing={video}
                  width="100%"
                  height="100%"
                />
              ) : (
                <img
                  src={NoVideoFallback}
                  alt="camera_off"
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </div>
          );
        }
      )}
      <div className="controls_wrapper">
        <div className="controls">
          <button
            className={`control-item text-white ${
              isAudioEnabled ? "bg-green-600" : "bg-red-500"
            }`}
            onClick={handleToggleAudio}
          >
            <span className="material-symbols-outlined">
              {isAudioEnabled ? "mic" : "mic_off"}
            </span>
          </button>
          <button
            className={`control-item text-white ${
              isVideoEnabled ? "bg-green-600" : "bg-red-500"
            }`}
            onClick={handleToggleVideo}
          >
            <span className="material-symbols-outlined">
              {isVideoEnabled ? "videocam" : "videocam_off"}
            </span>
          </button>
          <button className="control-item bg-red-500" onClick={onCallEnd}>
            <span className="material-symbols-outlined text-white">
              call_end
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;

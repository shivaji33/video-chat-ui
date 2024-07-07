import { useEffect, useRef, useState } from "react";
import { Peer } from "peerjs";

const usePeer = () => {
  const [peerId, setPeerId] = useState(null);
  const peerRef = useRef();

  useEffect(() => {
    if (peerRef.current) {
      return;
    }
    peerRef.current = new Peer();
    peerRef.current.on("open", (peerId) => {
      setPeerId(peerId);
    });

  }, []);

  return [peerRef.current,peerId];
};

export default usePeer;

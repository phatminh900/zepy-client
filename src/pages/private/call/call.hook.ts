import { useEffect, useState, useRef } from "react";

import toast from "react-hot-toast";
import endCallSound from "src/assets/mp3/end-call-sound.mp3";
import callingSound from "src/assets/mp3/calling.mp3";
import incomingSound from "src/assets/mp3/incoming-call.mp3";
import enterCallSound from "src/assets/mp3/door_bell.wav";
import {
  useGetCall,
  useUpdateUserCallingSocketId,
} from "src/features/call/call.hook";
import { useGetUser } from "src/hooks/useAuth";
import { socket } from "src/contexts/call.context";
import useSound from "src/hooks/useSound.hook";

const useCallHook = (callId: string) => {
  const TIME_OUT = 3000000;
  const [isNotAnswer, setIsNotAnswer] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [userState, setUserState] = useState({
    device: {
      audio: true,
      video: true,
    },
  });
  const [remoteState, setRemoteState] = useState({
    device: {
      audio: true,
      video: true,
    },
  });

  const { play: playEnterSound, stop: stopEnterSound } =
    useSound(enterCallSound);
  const { play: playCallingSound, stop: stopCallingSound } =
    useSound(callingSound);
  const { play: playEndCallSound, stop: stopEndCallSound } =
    useSound(endCallSound);
  const { play: playIncomingSound, stop: stopIncomingSound } =
    useSound(incomingSound);
  const [isEnd, setIsEnd] = useState(false);
  const { updateUserSocketId } = useUpdateUserCallingSocketId();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setParticipants] = useState<string[]>([]);
  const peerConnections = useRef<{ [key: string]: RTCPeerConnection }>({});
  const localMediaStream = useRef<MediaStream | null>(null);
  const remoteMediaStream = useRef<MediaStream | null>(null);
  const userLocalVideo = useRef<HTMLVideoElement | null>(null);
  const userRemoteVideo = useRef<HTMLVideoElement | null>(null);
  const avatarBoxRef = useRef<HTMLDivElement>(null);
  const { callData } = useGetCall({ callId });
  const { user, refetch } = useGetUser();

  const answerCall = () => {
    socket.emit("join_call", { callId: callData?.id });
  };
  const leaveCall = () => {
    socket.emit("leave_call");
    window.close();
  };
  const rejectCall = () => {
    socket.emit("reject_call", { userCallId: callData?.user_id });
    window.close();
  };
  const toggleMedia = (type: "video" | "audio") => {
    const track = localMediaStream
      .current!.getTracks()
      .find((track) => track.kind === type);
    track!.enabled = !track!.enabled;
    const otherParticipantId = Object.keys(peerConnections.current)[0];
    setUserState((prev) => {
      socket.emit("toggle_media", {
        ...prev.device,
        [type]: track!.enabled,
        participantId: otherParticipantId,
      });

      return { device: { ...prev.device, [type]: track!.enabled } };
    });
  };
  // get user
  useEffect(() => {
    refetch();
  }, [refetch]);
  //
  useEffect(() => {
    async function getMedia() {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      userLocalVideo.current!.srcObject = localMediaStream.current;
    }
    if (user?.id) {
      getMedia()
        .then(() => {
          setParticipants(["local"]);
        })
        .catch((e) => {
          toast.error(`Please enable camera and audio to continue`);
          console.log(e);
        });
    }
  }, [user?.id]);
  useEffect(() => {
    if (!user?.id) return;
    if (user?.id === callData?.user_id) {
      socket.emit("call", {
        userIdToCall: callData?.user_receive_id,
        callId: callData?.id,
      });
      socket.emit("join_call", { callId: callData?.id });
    }
  }, [user?.id, callData?.user_id, callData?.id, callData?.user_receive_id]);
  // add participant
  useEffect(() => {
    async function addParticipant({
      isCreateOffer,
      participantId,
    }: {
      participantId: string;
      isCreateOffer: false;
    }) {
      peerConnections.current[participantId] = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });
      peerConnections.current[participantId].onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit("relay_ice", {
            iceCandidate: e.candidate,
            participantId,
          });
        }
      };
      let tracksNumber = 0;
      peerConnections.current[participantId].ontrack = ({
        streams: [remoteStream],
      }) => {
        tracksNumber++;
        // ===2 for audio and video
        if (tracksNumber === 2) {
          setParticipants((prev) => [...prev, participantId]);
          remoteMediaStream.current = remoteStream;
          userRemoteVideo.current!.srcObject = remoteMediaStream.current;
          const remoteTrackAudio = remoteMediaStream.current
            .getTracks()
            .find((track) => track.kind === "audio");
          const remoteTrackVideo = remoteMediaStream.current
            .getTracks()
            .find((track) => track.kind === "video");
          setRemoteState({
            device: {
              audio: remoteTrackAudio!.enabled,
              video: remoteTrackVideo!.enabled,
            },
          });
          setIsConnected(true);
        }
      };
      localMediaStream.current?.getTracks().forEach((track) => {
        peerConnections.current[participantId].addTrack(
          track,
          localMediaStream.current!
        );
      });
      if (isCreateOffer) {
        const offer = await peerConnections.current[
          participantId
        ].createOffer();
        await peerConnections.current[participantId].setLocalDescription(offer);
        socket.emit("relay_sdp", { sdp: offer, participantId });
      }
    }
    if (!user?.id) return;
    socket.on("add_participant", addParticipant);
  }, [user?.id]);
  // add remote description
  useEffect(() => {
    const getSessionDescription = async ({
      sdp,
      participantId,
    }: {
      sdp: RTCSessionDescription;
      participantId: string;
    }) => {
      await peerConnections.current[participantId].setRemoteDescription(
        new RTCSessionDescription(sdp)
      );
      if (sdp.type === "offer") {
        const answer = await peerConnections.current[
          participantId
        ].createAnswer();

        await peerConnections.current[participantId].setLocalDescription(
          answer
        );
        socket.emit("relay_sdp", { sdp: answer, participantId });
      }
    };
    if (!user?.id) return;
    socket.on("session_description", getSessionDescription);
  }, [user?.id]);
  // add ice
  useEffect(() => {
    const getIceCandidate = ({
      iceCandidate,
      participantId,
    }: {
      iceCandidate: RTCIceCandidate;
      participantId: string;
    }) => {
      peerConnections.current[participantId].addIceCandidate(
        new RTCIceCandidate(iceCandidate)
      );
    };
    if (!user?.id) return;
    socket.on("ice_candidate", getIceCandidate);
  }, [user?.id]);
  // Leave call
  useEffect(() => {
    const removeParticipant = ({
      participantId,
    }: {
      participantId: string;
    }) => {
      toast("Your friend left the chat ");
      peerConnections.current[participantId].close();
      delete peerConnections.current[participantId];
      setIsEnd(true);
    };
    if (!user?.id) return;
    socket.on("remove_participant", removeParticipant);
  }, [user?.id]);
  // leave call by click X window
  useEffect(() => {
    const removeParticipant = ({
      participantId,
    }: {
      participantId: string;
    }) => {
      toast("Your friend left the chat ");
      peerConnections.current[participantId].close();
      delete peerConnections.current[participantId];
      setIsEnd(true);
    };
    if (!user?.id) return;

    return () => {
      socket.on("remove_participant", removeParticipant);
    };
  }, [user?.id]);
  useEffect(() => {
    if (user?.id) {
      socket.on("reject_call", () => {
        setIsRejected(true);
        const timer = setTimeout(() => {
          window.close();
        }, 5000);
        return () => clearTimeout(timer);
      });
    }
  }, [user?.id]);
  // toggle media
  useEffect(() => {
    if (!user?.id) return;
    socket.on(
      "toggle_media",
      ({ audio, video }: { audio: boolean; video: boolean }) => {
        setRemoteState({ device: { audio, video } });
      }
    );
  }, [user?.id]);

  // sounds
  // calling
  useEffect(() => {
    if (user?.id === callData?.user_id && !isConnected) {
      playCallingSound();
      if (!isConnected) {
        const timer1 = setTimeout(() => {
          setIsNotAnswer(true);
        }, TIME_OUT);
        const timer2 = setTimeout(() => {
          window.close();
        }, TIME_OUT + 5000);
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
    }
    // not answer

    if (isConnected) {
      stopCallingSound();
      return () => {
        stopCallingSound();
      };
    }
  }, [
    user?.id,
    isConnected,
    callData?.user_id,
    playCallingSound,
    stopCallingSound,
  ]);
  useEffect(() => {
    if (user?.id !== callData?.user_id && !isConnected) {
      playIncomingSound();
    }
    return () => {
      stopIncomingSound();
    };
  }, [
    user?.id,
    isConnected,
    callData?.user_id,
    playIncomingSound,
    stopIncomingSound,
  ]);
  //  set user calling socketit
  useEffect(() => {
    if (user?.id && user.id === callData?.user_id) {
      updateUserSocketId({ userId: user.id, userSocketId: socket.id });
    }
  }, [user?.id, updateUserSocketId, callData?.user_id]);

  useEffect(() => {
    if (isConnected) {
      playEnterSound();
    }
    return () => {
      stopEnterSound();
    };
  }, [playEnterSound, isConnected, stopEnterSound]);
  useEffect(() => {
    if (isEnd) {
      playEndCallSound();
    }
    return () => {
      stopEndCallSound();
    };
  }, [isEnd, playEndCallSound, stopEndCallSound]);
  return {
    isEnd,
    callData,
    isConnected,
    userLocalVideo,
    isNotAnswer,
    userState,
    toggleMedia,
    rejectCall,
    userRemoteVideo,
    remoteMediaStream,
    avatarBoxRef,
    leaveCall,
    remoteState,
    isRejected,
    answerCall,
  };
};
export default useCallHook;

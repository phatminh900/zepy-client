import {
  createNewAnswerCandidates,
  createNewOfferCandidates,
} from "src/services/call-offer.service";

const createConnection = ({
  peerConnection,
  localStream,
  remoteStream,
  type,
  participantId,
  userId,
}: {
  peerConnection: RTCPeerConnection | null;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  type: "offer" | "answer";
  participantId: string;
  userId: string;
}) => {
  const peer = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  remoteStream = new MediaStream();
  localStream?.getTracks().forEach((track) => {
    peerConnection?.addTrack(track, localStream);
  });

  if (peerConnection) {
    peerConnection.ontrack = async (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream!.addTrack(track);
      });
    };
    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        const ice = event.candidate.toJSON();
        type === "offer"
          ? await createNewOfferCandidates({
              userCreatedId: userId,
              participantId,
              offerCandidate: ice,
            })
          : await createNewAnswerCandidates({
              userCreatedId: userId,
              participantId,
              answerCandidate: ice,
            });
      }
    };
  }
  return peer;
};
export default createConnection;

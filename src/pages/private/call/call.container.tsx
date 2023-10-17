import { twMerge } from "tailwind-merge";
import { BsCameraVideo, BsCameraVideoOff } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { BiSolidMicrophone, BiSolidMicrophoneOff } from "react-icons/bi";
import { ImPhoneHangUp } from "react-icons/im";
import defaultUserImg from "src/assets/imgs/default-user.jpg";
import styles from "./call.module.css";
import useCallHook from "./call.hook";
import { useGetUser } from "src/hooks/useAuth";
import Avatar from "src/components/avatar";

const Call = () => {
  const { id } = useParams();
  const {
    isEnd,
    isConnected,
    rejectCall,
    userLocalVideo,
    userRemoteVideo,
    isNotAnswer,
    callData,
    isRejected,
    answerCall,
    avatarBoxRef,
    toggleMedia,
    remoteState,
    leaveCall,
    userState,
  } = useCallHook(id!);
  const { user } = useGetUser();
  if (!user) return null;
  const localVideo = (
    <div
      style={{
        width: !isConnected ? "100%" : "200px",
        height: !isConnected ? "100%" : "200px",
        position: !isConnected ? "relative" : "absolute",
        top: isConnected ? "5%" : 0,
        right: isConnected ? "3%" : 0,
        zIndex: 10,
      }}
    >
      <video
        ref={userLocalVideo}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-fill"
        style={{
          display:
            (!isConnected && user.id !== callData?.user_id) ||
            !userState.device.video
              ? "none"
              : "block",
        }}
      />
      {!userState.device.video && isConnected && (
        <div className="flex relative w-[200px] h-[200px] border border-white ">
          <div
            style={{
              filter: "blur(5px)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundImage:
                user?.id === callData?.user_id
                  ? `url(${
                      callData.user_call_profile.avatar || {
                        defaultUserImg,
                      }
                    })`
                  : `url(${
                      callData?.user_receive_profile.avatar || {
                        defaultUserImg,
                      }
                    })`,
            }}
            className="absolute inset-0"
          ></div>
          <div className="flex items-center w-full justify-center z-50">
            <Avatar
              size="large"
              src={
                user?.id === callData?.user_id
                  ? callData?.user_call_profile.avatar
                  : callData?.user_receive_profile.avatar
              }
            />
          </div>
        </div>
      )}
    </div>
  );
  const remoteVideo = (
    <div
      style={{
        width: !isConnected ? "50%" : "100%",
        height: !isConnected ? "50%" : "100%",
      }}
    >
      <video
        ref={userRemoteVideo}
        autoPlay
        playsInline
        className="w-full h-full object-fill"
        style={{w
          display: !remoteState.device.video ? "none" : "block",
        }}
      />
      {!remoteState.device.video && isConnected && (
        <div className="flex relative w-full h-full   ">
          <div
            style={{
              filter: "blur(5px)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundImage:
                user.id === callData?.user_id
                  ? `url(${
                      callData.user_call_profile.avatar || {
                        defaultUserImg,
                      }
                    })`
                  : `url(${
                      callData?.user_receive_profile.avatar || {
                        defaultUserImg,
                      }
                    })`,
            }}
            className="absolute inset-0"
          ></div>
          <div className="flex items-center w-full justify-center z-50">
            <Avatar
              size="ex-large"
              src={
                user.id === callData?.user_id
                  ? callData.user_call_profile.avatar || ""
                  : callData?.user_receive_profile.avatar || ""
              }
            />
          </div>
        </div>
      )}
      {/* audio state */}
      {(!remoteState.device.audio || !remoteState.device.video) && (
        <div className="absolute left-0 bottom-0 bg-white/20 flex gap-2 text-[var(--color-danger)] text-2xl px-3 py-6 z-50">
          {!remoteState.device.audio && <BiSolidMicrophoneOff />}
          {!remoteState.device.video && <BsCameraVideoOff />}
        </div>
      )}
    </div>
  );
  if (!callData?.user_id) return null;
  if (isRejected)
    return (
      <div className="flex justify-center items-center">
        <p className="text-3xl">Your friend rejected your call.</p>
      </div>
    );
  return (
    <div className="h-screen relative">
      {!isEnd ? (
        <>
          {!isConnected && (
            <div className="absolute left-1/2 top-1/2 whitespace-nowrap  -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 items-center color-[var(--color-grey-800)] z-[9999]">
              {/* Avatar */}
              <div ref={avatarBoxRef} className={`${styles.circle} `}>
                <div
                  className={`${styles.smallCircle} ${styles.smallCircle1}`}
                ></div>
                <div
                  className={`${styles.smallCircle} ${styles.smallCircle2}`}
                ></div>
                <div
                  className={`${styles.smallCircle} ${styles.smallCircle3}`}
                ></div>
                <Avatar
                  size="large"
                  src={
                    user.id === callData?.user_id
                      ? callData.user_receive_profile.avatar
                      : callData?.user_call_profile.avatar
                  }
                />
              </div>
              <h3 className="font-bold color-[var(--color-grey-800)]">
                {user.id === callData?.user_id
                  ? callData.user_receive_profile.fullname
                  : callData?.user_call_profile.fullname}
              </h3>
              <p>
                {user.id === callData?.user_id
                  ? `Calling ${callData.user_receive_profile.fullname}`
                  : `${callData?.user_call_profile.fullname} is calling you`}
              </p>
              {isNotAnswer && <p>User is not available</p>}
            </div>
          )}
          <div className="h-[60vh] md:h-[85vh]">
            <div className="h-full relative block">
              {/* Local video */}
              {localVideo}
              {/* Remote video */}
              {remoteVideo}
            </div>
          </div>
          {/* Bottom */}
          <div className="h-[15vh] flex justify-center items-center">
            {!isConnected ? (
              callData?.user_id === user.id ? (
                <div className="flex gap-4 items-center h-full justify-center ">
                  <CallButton
                    className={`${
                      !userState.device.video && "bg-[var(--color-danger)]"
                    }`}
                    onClick={() => toggleMedia("video")}
                  >
                    {userState.device.video ? (
                      <BsCameraVideo />
                    ) : (
                      <BsCameraVideoOff />
                    )}
                  </CallButton>
                  <CallButton
                    className="bg-[var(--color-danger)]"
                    onClick={leaveCall}
                  >
                    <ImPhoneHangUp />
                  </CallButton>
                  <CallButton
                    className={`${
                      !userState.device.audio && "!bg-[var(--color-danger)]"
                    }`}
                    onClick={() => toggleMedia("audio")}
                  >
                    {userState.device.audio ? (
                      <BiSolidMicrophone />
                    ) : (
                      <BiSolidMicrophoneOff />
                    )}
                  </CallButton>
                </div>
              ) : (
                <div className="flex gap-8 items-center h-full justify-center ">
                  <CallButton
                    className="bg-[var(--color-danger)]"
                    onClick={() => {
                      rejectCall();
                    }}
                  >
                    <ImPhoneHangUp />
                  </CallButton>
                  <CallButton
                    className={`bg-[var(--color-secondary)] var(--color-grey-0) w-12 h-12 rounded-full flex items-center justify-center  ${styles.answerCall}`}
                    onClick={answerCall}
                  >
                    <BsCameraVideo />
                  </CallButton>
                </div>
              )
            ) : null}
            {isConnected && (
              <div className="flex gap-4 items-center h-full justify-center ">
                <CallButton
                  className={`${
                    !userState.device.video && "bg-[var(--color-danger)]"
                  }`}
                  onClick={() => toggleMedia("video")}
                >
                  {userState.device.video ? (
                    <BsCameraVideo />
                  ) : (
                    <BsCameraVideoOff />
                  )}
                </CallButton>
                <CallButton
                  className="bg-[var(--color-danger)]"
                  onClick={leaveCall}
                >
                  <ImPhoneHangUp />
                </CallButton>
                <CallButton
                  onClick={() => toggleMedia("audio")}
                  className={`w-12 h-12 rounded-full flex items-center justify-center bg-[var(--color-grey-300)] ${
                    !userState.device.audio && "!bg-[var(--color-danger)]"
                  }`}
                >
                  {userState.device.audio ? (
                    <BiSolidMicrophone />
                  ) : (
                    <BiSolidMicrophoneOff />
                  )}
                </CallButton>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-3xl">The call has ended.</p>
        </div>
      )}
    </div>
  );
};
export default Call;

function CallButton({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`${twMerge(
        "z-50 w-12 h-12 rounded-full bg-[var(--color-grey-200)] flex items-center justify-center ",
        className
      )} `}
    >
      {children}
    </button>
  );
}

import Avatar from "src/components/avatar";
import {
  HiOutlineInbox,
  HiOutlineSearch,
  HiOutlineUserGroup,
  HiOutlineVideoCamera,
} from "react-icons/hi";
import styles from "./chat-header.module.css";

import ReturnButtonTitle from "src/components/return-button-title";
import useOpenTableMobile from "src/hooks/useOpenTab-mobile.hook";
import OnlineStatus from "src/components/online-status.component";
import DateCalculator from "src/components/date-calculator.component";

const ChatHeader = ({
  fullName,
  avatar,
  onlineStatus,
}: {
  onlineStatus: string | "Online";
  fullName: string;
  avatar: string;
}) => {
  const { isMoBile } = useOpenTableMobile();
  const AvatarStatus = (
    <div className="relative">
      <Avatar size="large" src={avatar} />
      {onlineStatus === "Online" && <OnlineStatus />}
    </div>
  );
  return (
    <div className="flex gap-3 py-1.5 md:py-3  h-[72px]">
      {isMoBile ? (
        <ReturnButtonTitle>{AvatarStatus}</ReturnButtonTitle>
      ) : (
        AvatarStatus
      )}
      <div className="flex-1">
        <div className="flex justify-between items-center h-full">
          <div>
            <h4
              className={`${styles.userName} text-sm    md:text-lg text-[var(--color-grey-800)]`}
            >
              {fullName}
            </h4>
            {onlineStatus !== "Online" ? (
              <DateCalculator time={onlineStatus} />
            ) : (
              <p className={`${styles.status} text-xs`}>Just now</p>
            )}
          </div>
          {/* actions */}
          <div className="text-xl flex">
            <button className="after:content-['+'] after:text-[12px] after:top-[-10px] after:right-1 after:absolute relative py-1 px-2 hover:bg-[var(--color-grey-200)]">
              <HiOutlineUserGroup />
            </button>
            <button className="  py-0.5 px-1.5    md:py-1  md:px-2 hover:bg-[var(--color-grey-200)]">
              <HiOutlineSearch />
            </button>
            <button className=" py-0.5 px-1.5     md:py-1  md:px-2 hover:bg-[var(--color-grey-200)]">
              <HiOutlineVideoCamera />
            </button>
            <button className="  py-0.5 px-1.5    md:py-1  md:px-2 hover:bg-[var(--color-grey-200)]">
              <HiOutlineInbox />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;

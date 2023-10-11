import { useState, useRef, useEffect } from "react";
import Avatar from "src/components/avatar";
import {
  HiOutlineSearch,
  HiOutlineUserGroup,
  HiOutlineVideoCamera,
} from "react-icons/hi";
import styles from "./chat-header.module.css";

import ReturnButtonTitle from "src/components/return-button-title";
import useOpenTableMobile from "src/hooks/useOpenTab-mobile.hook";
import OnlineStatus from "src/components/online-status.component";
import { useGetUser } from "src/hooks/useAuth";
import { useCallContext } from "src/contexts/call.context";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Modal from "src/components/modal";
import AddIntoGroup from "src/ui/main-column/add-into-group/add-into-group.component";
import SearchMessage from "./searchMessage.component";
import { PARAMS } from "src/constants/searchParams.constant";

const ChatHeader = ({
  fullName,
  avatar,
  onlineStatus,
  friendId,
  render,
}: {
  onlineStatus?: string | "Online";

  fullName: string;
  avatar: string;
  friendId?: string;
  render: () => JSX.Element;
}) => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const chatHeaderRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { user } = useGetUser();
  const [searchParams] = useSearchParams();
  const selectedMessageId = searchParams.get(PARAMS.selectMessageId);
  const { callOther } = useCallContext();
  const { id } = useParams();
  const { isMoBile } = useOpenTableMobile();

  const AvatarStatus = (
    <div className="relative">
      <Avatar size="large" src={avatar} />

      {onlineStatus && onlineStatus === "Online" && <OnlineStatus />}
    </div>
  );
  const handleCallUser = () => {
    callOther({
      userCallingId: user!.id,
      userIdToCall: friendId!,
      roomId: id!,
    });
  };
  // auto close when 1 of the selected message was clicked
  useEffect(() => {
    if (!selectedMessageId) return;
    setIsOpenSearch(false);
  }, [selectedMessageId]);
  return (
    <Modal>
      <div
        className="relative flex gap-3 py-1.5 md:py-3  h-[72px] "
        ref={chatHeaderRef}
      >
        {isMoBile ? (
          <ReturnButtonTitle>{AvatarStatus}</ReturnButtonTitle>
        ) : (
          AvatarStatus
        )}
        <div className="flex-1">
          <div className="flex justify-between items-center h-full">
            <div className="flex flex-col justify-between">
              <h4
                className={`${styles.userName} text-xs whitespace-nowrap    md:text-sm lg:text-lg text-[var(--color-grey-800)]`}
              >
                {fullName}
              </h4>
              {render()}
            </div>
            {/* actions */}
            <div className="text-xl flex">
              {/* add group */}
              {friendId && (
                <Modal.Button name="modal-group">
                  <button className="  flex items-center justify-center after:content-['+'] after:text-[12px] after:top-[-10px] after:right-1 after:absolute relative py-1 px-2 hover:bg-[var(--color-grey-200)]">
                    <HiOutlineUserGroup />
                  </button>
                </Modal.Button>
              )}
              <button
                onClick={() => {
                  setIsOpenSearch((prev) => !prev);
                }}
                className="  flex items-center justify-center   py-0.5 px-1.5    md:py-1  md:px-2 hover:bg-[var(--color-grey-200)]"
              >
                <HiOutlineSearch />
              </button>

              {friendId && (
                <button
                  onClick={handleCallUser}
                  className="  flex items-center justify-center  py-0.5 px-1.5     md:py-1  md:px-2 hover:bg-[var(--color-grey-200)]"
                >
                  <HiOutlineVideoCamera />
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Menu */}

        {isOpenSearch && (
          <SearchMessage
            onClose={() => {
              setIsOpenSearch(false);
              navigate({ search: "" });
            }}
          />
        )}
      </div>
      {/* Modal group */}
      <Modal.Window name="modal-group">
        <AddIntoGroup selectedFriendId={friendId} />
      </Modal.Window>
    </Modal>
  );
};
export default ChatHeader;

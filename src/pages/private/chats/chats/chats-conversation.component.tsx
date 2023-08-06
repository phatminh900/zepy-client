import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "src/components/avatar";
import DateCalculator from "src/components/date-calculator.component";
import Menu from "src/components/menu";
import SmallNotification from "src/components/small-notification";

import { PARAMS } from "src/constants/seachParams.constant";
import { useDeleteAllMessages } from "src/features/chat/chat.hook";
import { useGetUser } from "src/hooks/useAuth";
import useOpenTableMobile from "src/hooks/useOpenTab-mobile.hook";

const Conversation = ({
  fullName,
  avatar,
  lastMessageAt,
  lastMsg,
  isRead,
  authorId,
  unReadMessage,
  roomId,
}: {
  authorId: string;
  isRead: boolean;
  unReadMessage: number;
  roomId: string;
  fullName: string;
  avatar: string;
  lastMessageAt: string;
  lastMsg: string;
}) => {
  const { user } = useGetUser();
  const navigate = useNavigate();
  const { deleteWholeConversation, isDeletingWholeConversation } =
    useDeleteAllMessages();
  const { isMoBile, isOpenTab } = useOpenTableMobile();
  const randomId = Math.random();
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = () => {
    if (isMoBile && !isOpenTab) {
      // Open
      navigate({ pathname: roomId, search: `?${PARAMS.isOpenTab}=1` });
      return;
    }
    // CLose
    if (isMoBile && isOpenTab) {
      navigate({ pathname: roomId, search: `?${PARAMS.isOpenTab}=0` });
      return;
    }
    navigate(roomId);
  };

  return (
    <li
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer hover:bg-[var(--color-grey-200)] w-full  "
    >
      <div className="pr-2 md:pr-4 pl-2.5 md:pl-[var(--gutter-left-component)] py-[var(--gutter-left-component)] w-full flex gap-3">
        <Avatar size="large" src={avatar} />
        <div className="flex-1 ">
          <div className="flex justify-between">
            <h4
              className={`text-base md:text-lg text-[var(--color-grey-800)] ${
                !isRead && "font-semibold"
              }`}
            >
              {fullName}
            </h4>

            <div>
              <DateCalculator
                time={lastMessageAt}
                className={isHovered ? "hidden" : "block"}
              />
              {isHovered && <Menu.Toggle id={randomId.toString()} />}
            </div>
            <Menu.List id={randomId.toString()}>
              <Menu.Option onClick={() => {}}>
                Hide this conversation
              </Menu.Option>
              <Menu.Option
                disable={isDeletingWholeConversation}
                className="text-[var(--color-danger)]"
                onClick={() =>
                  deleteWholeConversation({ roomId, userId: user!.id })
                }
              >
                Delete this conversation
              </Menu.Option>
            </Menu.List>
          </div>
          <div className="flex justify-between">
            <p className="text-[10px] md:text-xs">
              {authorId === user!.id ? "You" : `${fullName}`} : {lastMsg}
            </p>

            {unReadMessage > 0 && (
              <SmallNotification quantity={unReadMessage} />
            )}
          </div>
        </div>
      </div>
    </li>
  );
};
export default Conversation;

import { useTranslation } from "react-i18next";
import { BsImage } from "react-icons/bs";
import Avatar from "src/components/avatar";
import DateCalculator from "src/components/date-calculator.component";
import Menu from "src/components/menu";
import SmallNotification from "src/components/small-notification";

import Modal from "src/components/modal";
import ConfirmDelete from "src/components/confirm-delete.component";
import { updateConversation } from "src/services/chats.service";
import useChatsConversation from "./chats-conversation.hook";
import { QueryKey } from "src/constants/query-key.constant";
import { useQueryClient } from "@tanstack/react-query";

const Conversation = ({
  fullName,
  avatar,
  lastMessageAt,
  lastMsg,
  isRead,
  authorId,
  type,
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
  type: "group" | "normal";
  lastMsg: string;
}) => {
  const { t } = useTranslation("chats");
  const query = useQueryClient();
  const {
    user,
    isDeletingWholeConversation,
    deleteWholeConversation,
    randomId,
    isHovered,
    handleClick,
    setIsHovered,
  } = useChatsConversation(roomId, type);
  return (
    <li
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer hover:bg-[var(--color-grey-200)] w-full  "
    >
      <Modal>
        <div className="pr-2 md:pr-4 pl-2.5 md:pl-[var(--gutter-left-component)] py-[var(--gutter-left-component)] w-full flex gap-3">
          <Avatar size="large" src={avatar} />
          <div className="flex-1 ">
            <div className="flex justify-between items-center">
              <h4
                className={`text-sm max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap md:text-lg text-[var(--color-grey-800)] ${
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
                {/* <Menu.Option onClick={() => {}}>
                  Hide this conversation
                </Menu.Option> */}
                <Modal.Button name="delete">
                  <Menu.Option
                    disable={isDeletingWholeConversation}
                    className="text-[var(--color-danger)]"
                    onClick={() => {}}
                  >
                    {t("delete")}
                  </Menu.Option>
                </Modal.Button>
              </Menu.List>
              <Modal.Window className="!h-auto" name="delete">
                <ConfirmDelete
                  resourceName="This conversation "
                  disabled={isDeletingWholeConversation}
                  onClose={() => {}}
                  onConfirm={() =>
                    deleteWholeConversation({ roomId, userId: user!.id }).then(
                      async () => {
                        query.refetchQueries({
                          queryKey: [QueryKey.GET_CONVERSATIONS],
                        });
                        await updateConversation({
                          userId: user!.id,
                          roomId,
                          field: "isChatted",
                          value: false,
                          conversationType: type,
                        });
                      }
                    )
                  }
                />
              </Modal.Window>
            </div>
            <div className="flex justify-between">
              <div className="text-[10px] md:text-xs flex items-center gap-1 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                {/* last message is an img */}
                {authorId === user!.id ? t("you") : `${fullName}`} :{" "}
                {lastMsg.startsWith(
                  "https://mthclejfvjbgltslemdj.supabase.co/storage/v1/object/public/message_img/"
                ) ? (
                  <p className="flex items-center gap-1.5">
                    {t("image")}
                    <BsImage />
                  </p>
                ) : (
                  lastMsg
                )}
              </div>

              {unReadMessage > 0 && (
                <SmallNotification quantity={unReadMessage} />
              )}
            </div>
          </div>
        </div>
      </Modal>
    </li>
  );
};
export default Conversation;

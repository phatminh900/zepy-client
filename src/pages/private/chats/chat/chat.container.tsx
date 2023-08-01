import { useCallback, useState } from "react";
import {
  HiOutlineInbox,
  HiOutlineSearch,
  HiOutlineUserGroup,
  HiOutlineVideoCamera,
  HiThumbUp,
  HiVideoCamera,
} from "react-icons/hi";
import Avatar from "src/components/avatar";
import ChatEmoji from "./chat-emoji.component";
import ChatImgUpload from "./chat-img-upload.component";
import ReturnButtonTitle from "src/components/return-button-title";
import useOpenTableMobile from "src/hooks/useOpenTab-mobile.hook";
import FriendMessage from "./friend-message.component";

const Chat = () => {
  const [message, setMessage] = useState("");
  const { isMoBile } = useOpenTableMobile();
  const handleSelectEmoji = useCallback(
    (emoji: string) => setMessage((prev) => prev + emoji),
    []
  );
  return (
    <div className="grid grid-rows-[72px_1fr_60px] [&>*]:px-5">
      {/* Header */}
      <div className="flex gap-3 py-3  h-[72px]">
        {isMoBile ? (
          <ReturnButtonTitle>
            <Avatar size="large" />
          </ReturnButtonTitle>
        ) : (
          <Avatar size="large" />
        )}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-lg text-[var(--color-grey-800)]">TITLE</h4>
              <p className="text-[12px]">Just now</p>
            </div>
            {/* actions */}
            <div className="text-xl ">
              <button className="after:content-['+'] after:text-[12px] after:top-[-10px] after:right-1 after:absolute relative py-1 px-2 hover:bg-[var(--color-grey-200)]">
                <HiOutlineUserGroup />
              </button>
              <button className="     py-1 px-2 hover:bg-[var(--color-grey-200)]">
                <HiOutlineSearch />
              </button>
              <button className="     py-1 px-2 hover:bg-[var(--color-grey-200)]">
                <HiOutlineVideoCamera />
              </button>
              <button className="     py-1 px-2 hover:bg-[var(--color-grey-200)]">
                <HiOutlineInbox />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Content Message */}

      <div className="pt-6 pb-3 bg-[var(--color-grey-200)] overflow-y-scroll flex-1">
        {/* Friend chat */}
        <ul className="flex flex-col gap-2">
          {/* <FriendMessage /> */}
          {/* Me */}
          <div className="flex justify-end ">
            <div className="bg-[var(--color-primary-light)] px-3 py-2 rounded-md">
              <p>Hello</p>
              <span className="text-[10px]">8:53</span>
            </div>
          </div>
          <div className="flex justify-end ">
            <div className="bg-[var(--color-primary-light)] px-3 py-2 rounded-md">
              <p>Hello</p>
              <span className="text-[10px]">8:53</span>
            </div>
          </div>
          <div className="flex justify-end ">
            <div className="bg-[var(--color-primary-light)] px-3 py-2 rounded-md">
              <p>Hello</p>
              <span className="text-[10px]">8:53</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Avatar size="medium" />
            <div className="bg-[var(--color-grey-0)] px-3 py-2 rounded-md">
              <p>Hello</p>
              <span className="text-[10px]">8:53</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Avatar size="medium" />
            <div className="bg-[var(--color-grey-0)] px-3 py-2 rounded-md">
              <p>Hello</p>
              <span className="text-[10px]">8:53</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Avatar size="medium" />
            <div className="bg-[var(--color-grey-0)] px-3 py-2 rounded-md">
              <p>Hello</p>
              <span className="text-[10px]">8:53</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Avatar size="medium" />
            <div className="bg-[var(--color-grey-0)] px-3 py-2 rounded-md">
              <p>Hello</p>
              <span className="text-[10px]">8:53</span>
            </div>
          </div>
        </ul>
      </div>
      {/* footer */}
      <form className="bg-[var(--color-grey-0)] h-[60px] w-full flex justify-between items-center">
        <input
          className="w-full"
          type="text"
          value={message}
          placeholder="Chat now"
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="[&>button]:flex [&>button]:items-center text-2xl flex gap-3">
          <ChatImgUpload />

          <ChatEmoji onSelectEmoji={handleSelectEmoji} />
          <button title="Send quick emoji" type="button">
            <HiThumbUp />
          </button>
          {/* <EmojiPicker theme={Theme.DARK} height={425} width={295} /> */}
        </div>
      </form>
    </div>
  );
};
export default Chat;

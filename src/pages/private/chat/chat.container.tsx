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
import ChatEmoji from "./chat-emoji";
import ChatImgUpload from "./chat-img-upload";

const Chat = () => {
  const [message, setMessage] = useState("");

  const handleSelectEmoji = useCallback(
    (emoji: string) => setMessage((prev) => prev + emoji),
    []
  );
  return (
    <div className="flex flex-col [&>*]:px-5">
      {/* Header */}
      <div className="flex gap-3 py-3  h-[72px]">
        <Avatar size="large" />
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

      <div className="bg-[var(--color-grey-200)] flex-1"></div>
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

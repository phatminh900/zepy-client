import { HiThumbUp } from "react-icons/hi";
import { BiSend } from "react-icons/bi";
import ChatEmoji from "./chat-emoji.component";
import ChatImgUpload from "./chat-img-upload.component";
import useChatSendMessage from "./chat-send-message.hook";

const ChatSendMessage = ({
  message,
  roomId,
  onSelectEmoji,
  onSetMessage,
  onSendMessage,
  onSelectImg,
}: {
  message: string;
  roomId: string;
  onSendMessage: (e: React.FormEvent) => void;
  onSelectImg: (file: File) => void;
  onSetMessage: (message: string) => void;
  onSelectEmoji: (emoji: string) => void;
}) => {
  const { inputRef, handleChange, handleKeyDown } = useChatSendMessage(
    roomId,
    onSetMessage
  );
  return (
    <form
      onSubmit={onSendMessage}
      className="bg-[var(--color-grey-0)]  w-full flex justify-between items-center"
    >
      <input
        ref={inputRef}
        className="w-full"
        type="text"
        onKeyDown={handleKeyDown}
        value={message}
        placeholder="Chat now"
        onChange={handleChange}
      />
      <div className="[&>button]:flex [&>button]:items-center text-2xl flex gap-3">
        <ChatImgUpload onSelectImg={onSelectImg} />

        <ChatEmoji onSelectEmoji={onSelectEmoji} />
        {!message.trim() ? (
          <button
            title="Send quick emoji"
            onClick={() => {
              onSetMessage("👍");
            }}
          >
            <HiThumbUp />
          </button>
        ) : (
          <button className="text-[var(--color-primary)]" title="Send message">
            <BiSend />
          </button>
        )}
        <button type="submit" className="w-0 h-0"></button>
        {/* <EmojiPicker theme={Theme.DARK} height={425} width={295} /> */}
      </div>
    </form>
  );
};
export default ChatSendMessage;

import { useEffect, useRef } from "react";
import { HiThumbUp } from "react-icons/hi";
import ChatEmoji from "./chat-emoji.component";
import ChatImgUpload from "./chat-img-upload.component";

const ChatSendMessage = ({
  message,
  onSelectEmoji,
  onSetMessage,
  onSendMessage,
}: {
  message: string;
  roomId: string;
  onSendMessage: (e: React.FormEvent) => void;
  onSetMessage: (message: string) => void;
  onSelectEmoji: (emoji: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form
      onSubmit={onSendMessage}
      className="bg-[var(--color-grey-0)]  w-full flex justify-between items-center"
    >
      <input
        ref={inputRef}
        className="w-full"
        type="text"
        value={message}
        placeholder="Chat now"
        onChange={(e) => onSetMessage(e.target.value)}
      />
      <div className="[&>button]:flex [&>button]:items-center text-2xl flex gap-3">
        <ChatImgUpload />

        <ChatEmoji onSelectEmoji={onSelectEmoji} />
        <button title="Send quick emoji" type="button">
          <HiThumbUp />
        </button>
        <button type="submit" className="w-0 h-0"></button>
        {/* <EmojiPicker theme={Theme.DARK} height={425} width={295} /> */}
      </div>
    </form>
  );
};
export default ChatSendMessage;

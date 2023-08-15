import { formatTime } from "src/utils/format-time";
import ChatActions from "./chat-actions.componen";

const ChatMessageDetail = ({
  createdAt,
  message,
  onDeleteMessage,
  id,
}: {
  id: string;
  createdAt: string;
  message: string;
  onDeleteMessage: (id: string) => void;
}) => {
  return (
    <div>
      {message.startsWith("https://mthclejfvjbgltslemdj.supabase.co/") ? (
        <img
          className="block max-h-[360px] max-w-[500px] object-cover"
          src={message}
          alt="Img Message"
        />
      ) : (
        <p>{message}</p>
      )}
      <span className={`text-[10px]`}>{formatTime(createdAt)}</span>
      {/* actions */}
      <ChatActions onDeleteMessage={onDeleteMessage} position="right" id={id} />
    </div>
  );
};
export default ChatMessageDetail;

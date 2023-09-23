import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { formatTime } from "src/utils/format-time";

import ChatActions from "./chat-actions.componen";
import Modal from "src/components/modal";

const ChatMessageDetail = ({
  createdAt,
  message,
  onDeleteMessage,
  id,
  position,
}: {
  id: string;
  position: "left" | "right";
  createdAt: string;
  message: string;
  onDeleteMessage: (id: string) => void;
}) => {
  return (
    <div>
      {message.startsWith("https://mthclejfvjbgltslemdj.supabase.co/") ? (
        <Modal>
          <Modal.Button name="open-img">
            <div className="cursor-pointer">
              <img
                className="block max-h-[360px] max-w-[500px] object-cover"
                src={message}
                alt="Img Message"
              />
            </div>
          </Modal.Button>
          <Modal.Window name="open-img">
            <TransformWrapper>
              <TransformComponent>
                <img
                  className="block w-full h-full object-cover"
                  src={message}
                  alt="Img Message"
                />
              </TransformComponent>
            </TransformWrapper>
          </Modal.Window>
        </Modal>
      ) : (
        <p>{message}</p>
      )}
      <span className={`text-[10px]`}>{formatTime(createdAt)}</span>
      {/* actions */}
      <ChatActions
        onDeleteMessage={onDeleteMessage}
        position={position}
        id={id}
      />
    </div>
  );
};
export default ChatMessageDetail;

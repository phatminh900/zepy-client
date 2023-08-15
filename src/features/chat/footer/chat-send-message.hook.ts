import { useEffect, useRef, useState } from "react";
import { useGetUser } from "src/hooks/useAuth";
import { useAppSelector } from "src/hooks/useSelectorDispatch.hook";
const useChatSendMessage = (
  roomId: string,
  onSetMessage: (val: string) => void
) => {
  const { user } = useGetUser();
  const [isTyping, setIsTyping] = useState(false);
  const timeout = useRef<null | NodeJS.Timeout>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const channel = useAppSelector((store) => store.chat.channel);
  const handleKeyDown = () => {
    setIsTyping(true);
  };

  const handleChange = (e: React.ChangeEvent) => {
    onSetMessage((e.target as HTMLInputElement).value);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    if (isTyping) {
      channel?.send({
        type: "broadcast",
        event: "typing",
        payload: {
          userId: user!.id,
          isTyping: true,
          fullName: user?.fullname,
        },
      });
    }
    if (!isTyping) {
      channel?.send({
        type: "broadcast",
        event: "typing",
        payload: {
          userId: user!.id,
          isTyping: false,
          fullName: user?.fullname,
        },
      });
    }
  }, [isTyping, roomId, user, channel]);
  useEffect(() => {
    function debounce() {
      timeout.current && clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setIsTyping(false), 1000);
    }
    if (isTyping) {
      debounce();
    }
  }, [isTyping]);
  return { handleChange, handleKeyDown, inputRef };
};
export default useChatSendMessage;

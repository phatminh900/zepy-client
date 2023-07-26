import { useState, memo } from "react";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import EmojiPicker, {
  EmojiStyle,
  EmojiClickData,
  Theme,
} from "emoji-picker-react";
import useClickOutside from "src/hooks/useClickOutside";

const ChatEmoji = memo(function ChatEmoji({
  onSelectEmoji,
}: {
  onSelectEmoji: (emoji: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const { ref } = useClickOutside(close);
  const [emojiPickerPosition, setEmojiPickerPosition] = useState({
    top: 0,
    right: 0,
  });
  const handleOpenEmoji = (e: React.MouseEvent) => {
    e.stopPropagation();
    const button = (e.target as HTMLButtonElement).closest("button")!;
    const rect = button.getBoundingClientRect();

    const emojiHeight = ref.current?.getBoundingClientRect().height || 10;
    setEmojiPickerPosition({
      top: rect.y - emojiHeight,
      right: window.innerWidth - rect.x - rect.width - 8,
    });
    setIsOpen((prev) => !prev);
  };
  const handleSelectEmoji = (emoji: EmojiClickData) => {
    onSelectEmoji(emoji.emoji);
  };

  return (
    <div className="relative flex items-center">
      <button title="Send an emoji" onClick={handleOpenEmoji} type="button">
        <HiOutlineEmojiHappy />
      </button>
      <div
        className={`fixed ${
          isOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        } h-[450px] w-[350px]`}
        ref={ref}
        style={{
          top: emojiPickerPosition.top + "px",
          right: emojiPickerPosition.right + "px",
        }}
      >
        <EmojiPicker
          emojiStyle={EmojiStyle.NATIVE}
          onEmojiClick={handleSelectEmoji}
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
});

export default ChatEmoji;

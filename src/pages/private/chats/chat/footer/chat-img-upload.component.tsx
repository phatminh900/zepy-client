import { HiOutlinePhotograph } from "react-icons/hi";

const ChatImgUpload = () => {
  return (
    <div>
      <label
        title="Send an image"
        htmlFor="message-img"
        className="cursor-pointer"
      >
        <HiOutlinePhotograph />
      </label>
      <input type="file" accept="image/*" id="message-img" className="hidden" />
    </div>
  );
};
export default ChatImgUpload;

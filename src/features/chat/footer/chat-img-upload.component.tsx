import { HiOutlinePhotograph } from "react-icons/hi";

const ChatImgUpload = ({
  onSelectImg,
}: {
  onSelectImg: (file: File) => void;
}) => {
  const handleChange = (e: React.ChangeEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const file = (e.target as HTMLInputElement)!.files[0];
    onSelectImg(file);
  };
  return (
    <div>
      <label
        title="Send an image"
        htmlFor="message-img"
        className="cursor-pointer"
      >
        <HiOutlinePhotograph />
      </label>
      <input
        type="file"
        accept="image/*"
        id="message-img"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
};
export default ChatImgUpload;

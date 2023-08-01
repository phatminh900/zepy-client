interface IAvatar {
  size: "large" | "small" | "medium" | "ex-large";
  src?: string;
}
const Avatar = ({ size, src }: IAvatar) => {
  const imgSize = {
    "ex-large": "w-[56px] h-[56px]",
    large: "w-12 h-12",
    small: "w-4 h-4",
    medium: "w-10 h-10",
  };
  return (
    <div
      className={`rounded-full w-12 ${imgSize[size]} overflow-hidden ring-1  ring-grey-50`}
    >
      <img
        src={src || "/imgs/default-user.jpg"}
        className="object-cover bg-center"
        alt="User Img"
      />
    </div>
  );
};
export default Avatar;

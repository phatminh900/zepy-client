interface IAvatar {
  size: "large" | "small" | "medium";
  src?: string;
}
const Avatar = ({ size, src }: IAvatar) => {
  const imgSize = {
    large: "w-12 h-12",
    small: "w-4 h-4",
    medium: "w-6 h-6",
  };
  return (
    <div
      className={`rounded-full ${imgSize[size]} overflow-hidden ring-1  ring-grey-50`}
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

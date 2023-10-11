interface IAvatar {
  size: "large" | "small" | "medium" | "ex-large";
  src?: string;
}
const Avatar = ({ size, src }: IAvatar) => {
  const imgSize = {
    "ex-large": "w-[56px] h-[56px]",
    large: " w-10 h-10  md:w-12  w- h-  md:h-12",
    small: " w-3 h-3  md:w-4  w- h-  md:h-4",
    medium: " w-8 h-8  md:w-10  w- h-  md:h-10",
  };
  return (
    <div
      className={`z-50 rounded-full flex  ${imgSize[size]} overflow-hidden ring-1  ring-grey-50`}
    >
      <img
        src={src || "/imgs/default-user.jpg"}
        className="object-cover bg-center w-full"
        alt="User Img"
      />
    </div>
  );
};
export default Avatar;

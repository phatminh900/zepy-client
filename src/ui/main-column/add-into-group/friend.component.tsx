import { useEffect, useState } from "react";
import { HiOutlineCheck } from "react-icons/hi";
import Avatar from "src/components/avatar";

const Friend = ({
  onHandleAddFriend,
  id,
  fullName,
  avatar,
  defaultAdded = false,
}: {
  id: string;
  fullName: string;
  avatar: string;
  onHandleAddFriend: ({ id }: { id: string }) => void;
  defaultAdded?: boolean;
}) => {
  const [isAdded, setIsAdded] = useState(defaultAdded);
  const handleClick = () => {
    setIsAdded((prev) => !prev);
  };
  useEffect(() => {
    if (isAdded) {
      onHandleAddFriend({ id });
    }
  }, [isAdded, id, onHandleAddFriend]);
  return (
    <li
      onClick={handleClick}
      key={id}
      className={`cursor-pointer flex items-center gap-2.5 p-2 hover:bg-[var(--color-grey-300)]  `}
    >
      <button
        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
          isAdded ? "bg-[var(--color-primary)]" : ""
        }`}
      >
        {isAdded ? <HiOutlineCheck /> : null}
      </button>
      <Avatar size="medium" src={avatar} />
      <p>{fullName}</p>
    </li>
  );
};
export default Friend;

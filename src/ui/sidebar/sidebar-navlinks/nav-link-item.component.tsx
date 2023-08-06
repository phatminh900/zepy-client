import { NavLink } from "react-router-dom";
import SmallNotification from "src/components/small-notification";
import { twMerge } from "tailwind-merge";
const NavLinkItem = ({
  path,
  icon,
  title,
  callback,
  className,
  notificationQuantity,
}: {
  notificationQuantity?: number;
  title: string;
  className?: string;
  path: string;
  icon: React.ReactNode;
  callback?: () => void;
}) => {
  return (
    <li
      key={path}
      className={twMerge(
        "relative cursor-pointer w-full flex items-center justify-center hover:bg-[var(--color-primary-dark)]",
        className
      )}
    >
      <NavLink
        onClick={() => callback?.()}
        to={path}
        title={title}
        className={
          "w-full p-4 flex justify-center items-center text-[var(--color-grey-0)] text-2xl"
        }
      >
        {icon}
      </NavLink>
      {notificationQuantity ? (
        <SmallNotification
          className="top-0 right-0 absolute"
          quantity={notificationQuantity}
        />
      ) : null}
    </li>
  );
};
export default NavLinkItem;

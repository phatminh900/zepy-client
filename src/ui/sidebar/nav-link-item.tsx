import { NavLink } from "react-router-dom";

const NavLinkItem = ({
  path,
  icon,
  title,
  callback,
}: {
  title: string;

  path: string;
  icon: React.ReactNode;
  callback?: () => void;
}) => {
  return (
    <li
      key={path}
      className=" cursor-pointer w-full flex items-center justify-center hover:bg-[var(--color-primary-dark)]"
    >
      <NavLink
        onClick={() => callback?.()}
        to={path}
        title={title}
        className={"p-6 text-[var(--color-grey-0)] text-2xl"}
      >
        {icon}
      </NavLink>
    </li>
  );
};
export default NavLinkItem;

import { NavLink, useLocation } from "react-router-dom";
import styles from "./contacts-sidebar.module.css";
import { FiUsers } from "react-icons/fi";
import { HiOutlineMailOpen, HiOutlineUserGroup } from "react-icons/hi";
import useOpenTableMobile from "src/hooks/useOpenTab-mobile.hook";
import { PARAMS } from "src/constants/seachParams.constant";
const ContactsSideBar = () => {
  const { pathname } = useLocation();
  const { isMoBile, isOpenTab } = useOpenTableMobile();

  const links = [
    {
      path: "all-friends",
      label: "All Friends",
      icon: <FiUsers />,
    },
    {
      path: "groups",
      label: "Joined Groups",
      icon: <HiOutlineUserGroup />,
    },
    {
      path: "friends-request",
      label: "Friends Request",
      icon: <HiOutlineMailOpen />,
    },
  ];
  return (
    <ul className={styles.sidebar}>
      {links.map((link) => (
        <li key={link.path}>
          <NavLink
            to={{
              pathname: link.path,
              search: isMoBile
                ? `?${PARAMS.isOpenTab}=${isMoBile && !isOpenTab ? "1" : "0"}`
                : "",
            }}
            state={{ prevLink: pathname + "/" + link.path }}
            className="py-[var(--gutter-left-component)] pl-[var(--gutter-left-component)] w-full font-semibold h-full  flex gap-3.5"
          >
            <span className=" text-xl">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
export default ContactsSideBar;

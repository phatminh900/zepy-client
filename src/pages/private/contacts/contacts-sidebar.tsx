import { NavLink } from "react-router-dom";
import styles from "./contacts-sidebar.module.css";
const ContactsSideBar = () => {
  const links = [
    {
      path: "all-friends",
      label: "All Friends",
    },
    {
      path: "groups",
      label: "Joined Groups",
    },
    {
      path: "friends-request",
      label: "Friends Request",
    },
  ];
  return (
    <ul className={styles.sidebar}>
      {links.map((link) => (
        <li key={link.path}>
          <NavLink
            to={link.path}
            className="py-[var(--gutter-left-component)] pl-[var(--gutter-left-component)] w-full h-full block"
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
export default ContactsSideBar;

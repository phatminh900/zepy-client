import { useLocation } from "react-router-dom";
import styles from "./contacts-sidebar.module.css";
import { FiUsers } from "react-icons/fi";
import { HiOutlineMailOpen, HiOutlineUserGroup } from "react-icons/hi";
import ContactSideBarItem from "./contact-sidebar-item.component";
import { useGetRequestedFriend } from "src/features/contact/contact.hook";
const ContactsSideBar = () => {
  const { pathname } = useLocation();
  const { requestedFriend } = useGetRequestedFriend();
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
      {links.slice(0, 2).map((link) => (
        <ContactSideBarItem pathname={pathname} key={link.path} {...link} />
      ))}
      {/*  */}
      <ContactSideBarItem
        pathname={pathname}
        label={links[links.length - 1].label}
        path={links[links.length - 1].path}
        notificationQuantity={requestedFriend?.length}
        icon={links[links.length - 1].icon}
      />
    </ul>
  );
};
export default ContactsSideBar;

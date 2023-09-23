import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import styles from "./contacts-sidebar.module.css";
import { FiUsers } from "react-icons/fi";
import { HiOutlineMailOpen, HiOutlineUserGroup } from "react-icons/hi";
import ContactSideBarItem from "./contact-sidebar-item.component";
import { useGetRequestedFriend } from "src/features/contact/contact.hook";
const ContactsSideBar = () => {
  const { t } = useTranslation("contact");
  const { pathname } = useLocation();
  const { requestedFriend } = useGetRequestedFriend();
  const links = [
    {
      path: "all-friends",
      label: t("allFriend"),
      icon: <FiUsers />,
    },
    {
      path: "groups",
      label: t("joinedGroup"),
      icon: <HiOutlineUserGroup />,
    },
    {
      path: "friends-request",
      label: t("friendRequests"),
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

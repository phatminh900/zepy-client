import { useRef } from "react";
import { FaRegAddressBook } from "react-icons/fa";
import { HiOutlineChat, HiOutlineClipboardCheck } from "react-icons/hi";
import { ROUTES } from "src/constants/navigation.constant";
import styles from "./sidebar.module.css";
import useOpenTableMobile from "src/hooks/useOpenTab-mobile.hook";
import NavLinks from "./sidebar-navlinks/nav-links.component";
import SideBarProfile from "./sidebar-profile/side-bar-profile.component";

export interface INavLink {
  path: string;
  icon: React.ReactNode;
  title: string;
  callBack?: () => void;
}

const PROFILE_MENU_WIDTH = 250;

const SideBar = () => {
  const { toggleChatState } = useOpenTableMobile();
  const navLinks: INavLink[] = [
    {
      path: ROUTES.CHATS,
      icon: <HiOutlineChat />,
      title: "Conversations",
      callBack: () => {
        toggleChatState();
      },
    },
    {
      path: ROUTES.CONTACTS,
      icon: <FaRegAddressBook />,
      title: "All Friends",
    },
    {
      path: ROUTES.TODOS,
      icon: <HiOutlineClipboardCheck />,
      title: "Todos",
    },
    // { path: ROUTES.SETTINGS, icon: <HiOutlineCog />, title: "settings" },
  ];
  const sideBarRef = useRef<null | HTMLElement>(null);
  const placeMenuPosition = (e: React.MouseEvent) => {
    const sideBarEl = sideBarRef.current!;
    const sideBarRect = sideBarEl.getBoundingClientRect();

    const button = (e.target as HTMLButtonElement).closest("button")!;
    const buttonRect = button.getBoundingClientRect();
    const top = buttonRect.y;
    const right = window.innerWidth - sideBarRect.width - PROFILE_MENU_WIDTH;
    return { top, right };
  };
  return (
    <aside
      ref={sideBarRef}
      className={`${styles.sidebar} pt-8  bg-[var(--color-primary)] flex flex-col items-center`}
    >
      <SideBarProfile placeMenuPosition={placeMenuPosition} />
      <NavLinks navLinks={navLinks} />
    </aside>
  );
};
export default SideBar;

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineChat,
  HiOutlineUserGroup,
  HiOutlineClipboardCheck,
  HiOutlineCog,
} from "react-icons/hi";
import Avatar from "src/components/avatar";
import { ROUTES } from "src/constants/navigation.constant";
import NavLinkItem from "./nav-link-item";
import styles from "./sidebar.module.css";
import Menu from "src/components/menu";
import useChatHook from "src/pages/private/chats/chats.hook";

interface INavLink {
  path: string;
  icon: React.ReactNode;
  title: string;
  callBack?: () => void;
}

const PROFILE_MENU_WIDTH = 250;

const SideBar = () => {
  const { toggleChatState } = useChatHook();
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
      path: ROUTES.FRIENDS,
      icon: <HiOutlineUserGroup />,
      title: "All Friends",
    },
    {
      path: ROUTES.TODOS,
      icon: <HiOutlineClipboardCheck />,
      title: "Todos",
    },
    { path: ROUTES.SETTINGS, icon: <HiOutlineCog />, title: "settings" },
  ];
  const navigate = useNavigate();
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
      <div className="cursor-pointer">
        <Menu>
          <Menu.Toggle placeMenuPosition={placeMenuPosition} id="user-profile">
            <Avatar size="large" />
          </Menu.Toggle>
          {/* MENUS */}
          <Menu.List className="w-[250px]" id="user-profile">
            <Menu.Option className="cursor-default" onClick={() => {}}>
              <h3 className="font-semibold">Phat</h3>
            </Menu.Option>
            <Menu.Option
              onClick={() => {
                navigate(ROUTES.PROFILE);
              }}
            >
              Profile
            </Menu.Option>
            <Menu.Option
              onClick={() => {
                navigate(ROUTES.SETTINGS);
              }}
            >
              Settings
            </Menu.Option>
            <Menu.Option
              className="text-[var(--color-danger)]"
              onClick={() => {}}
            >
              Log out
            </Menu.Option>
          </Menu.List>
        </Menu>
      </div>
      <ul className="h-full mt-6 w-full flex flex-col [&>li:last-child]:mt-auto">
        {/* Slice to todos path */}
        {navLinks.map((link) => (
          <NavLinkItem {...link} key={link.path} />
        ))}
      </ul>
    </aside>
  );
};
export default SideBar;

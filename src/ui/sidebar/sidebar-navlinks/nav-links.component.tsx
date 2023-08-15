import { HiOutlineCog, HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { FaRegAddressBook } from "react-icons/fa";
import { HiOutlineChat } from "react-icons/hi";
import { useThemeContext } from "src/contexts/theme.context";
import NavLinkItem from "./nav-link-item.component";
import { ROUTES } from "src/constants/navigation.constant";
import { useGetRequestedFriend } from "src/features/contact/contact.hook";
import useOpenTableMobile from "src/hooks/useOpenTab-mobile.hook";
// const navLinks: INavLink[] = [
//   {
//     path: ROUTES.CHATS,
//     icon: <HiOutlineChat />,
//     title: "Conversations",
//     callBack: () => {
//       toggleChatState();
//     },
//   },
//   {
//     path: ROUTES.CONTACTS,
//     icon: <FaRegAddressBook />,
//     title: "All Friends",
//   },
//   {
//     path: ROUTES.TODOS,
//     icon: <HiOutlineClipboardCheck />,
//     title: "Todos",
//   },
//   // { path: ROUTES.SETTINGS, icon: <HiOutlineCog />, title: "settings" },
// ];
const NavLinks = () => {
  const { toggleChatState } = useOpenTableMobile();

  const { isDarkMode, toggleDarkMode } = useThemeContext();
  const { requestedFriend } = useGetRequestedFriend();
  return (
    <ul className="h-full mt-6 w-full flex flex-col ">
      {/* Slice to todos path */}
      <NavLinkItem
        path={ROUTES.CHATS}
        icon={<HiOutlineChat />}
        title={"Conversations"}
        callback={() => {
          toggleChatState();
        }}
      />
      <NavLinkItem
        path={ROUTES.CONTACTS}
        icon={<FaRegAddressBook />}
        title={"Contacts"}
        notificationQuantity={requestedFriend?.length}
      />

      {/* {navLinks.map((link) => (
        <NavLinkItem {...link} key={link.path} />
      ))} */}
      <div className="mt-auto">
        <li
          title={!isDarkMode ? "Change to dark Mode" : "Change to light mode"}
          className="text-3xl mb-3 text-[var(--color-grey-0)] cursor-pointer w-full flex items-center justify-center "
        >
          <button
            className="flex justify-center w-full h-full"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
          </button>
        </li>

        <NavLinkItem
          icon={<HiOutlineCog />}
          path={ROUTES.SETTINGS}
          title="Settings"
        />
      </div>
    </ul>
  );
};
export default NavLinks;

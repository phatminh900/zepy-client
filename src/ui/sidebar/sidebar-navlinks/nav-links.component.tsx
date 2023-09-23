import { HiOutlineCog, HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { BsJournalCheck } from "react-icons/bs";
import { FaRegAddressBook } from "react-icons/fa";
import { HiOutlineChat } from "react-icons/hi";
import { useThemeContext } from "src/contexts/theme.context";
import { useTranslation } from "react-i18next";
import NavLinkItem from "./nav-link-item.component";
import { ROUTES } from "src/constants/navigation.constant";
import { useGetRequestedFriend } from "src/features/contact/contact.hook";
import useOpenTableMobile from "src/hooks/useOpenTab-mobile.hook";
import { useGetConversations } from "src/features/chat/chat.hook";

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
  const { t } = useTranslation("sidebar");
  const { toggleChatState } = useOpenTableMobile();
  const { conversations } = useGetConversations();
  const unReadMessageCount = conversations?.reduce(
    (acc, conversation) => acc + conversation.unReadMessageCount,
    0
  );
  const { isDarkMode, toggleDarkMode } = useThemeContext();
  const { requestedFriend } = useGetRequestedFriend();

  return (
    <ul className="h-full mt-6 w-full flex flex-col ">
      {/* Slice to todos path */}
      <NavLinkItem
        path={ROUTES.CHATS}
        icon={<HiOutlineChat />}
        title={t("conversation")}
        callback={() => {
          toggleChatState();
        }}
        notificationQuantity={unReadMessageCount}
      />
      <NavLinkItem
        path={ROUTES.CONTACTS}
        icon={<FaRegAddressBook />}
        title={t("contacts")}
        notificationQuantity={requestedFriend?.length}
      />
      <NavLinkItem
        path={ROUTES.TODOS}
        icon={<BsJournalCheck />}
        title={"Todos"}
        // notificationQuantity={requestedFriend?.length}
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
            title={t("toggle")}
          >
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
          </button>
        </li>

        <NavLinkItem
          icon={<HiOutlineCog />}
          path={ROUTES.SETTINGS}
          title={t("settings")}
        />
      </div>
    </ul>
  );
};
export default NavLinks;

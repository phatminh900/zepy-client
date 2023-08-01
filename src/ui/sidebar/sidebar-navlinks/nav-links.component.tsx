import { HiOutlineCog, HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useThemeContext } from "src/contexts/theme.context";
import NavLinkItem from "./nav-link-item.component";
import { INavLink } from "../sidebar.component";
import { ROUTES } from "src/constants/navigation.constant";

const NavLinks = ({ navLinks }: { navLinks: INavLink[] }) => {
  const { isDarkMode, toggleDarkMode } = useThemeContext();
  return (
    <ul className="h-full mt-6 w-full flex flex-col ">
      {/* Slice to todos path */}
      {navLinks.map((link) => (
        <NavLinkItem {...link} key={link.path} />
      ))}
      <div className="mt-auto">
        <li
          title={!isDarkMode ? "Change to dark Mode" : "Change to light mode"}
          className="text-3xl mb-3 text-[var(--color-grey-0)] cursor-pointer w-full flex items-center justify-center "
        >
          <button onClick={toggleDarkMode}>
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

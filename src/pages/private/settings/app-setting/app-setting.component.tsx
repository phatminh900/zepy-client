import InputRadio from "src/components/input-radio";
import VietNamIcon from "./flag-for-flag-vietnam-svgrepo-com.svg";
import UsaIcon from "./flag-us-svgrepo-com.svg";
import RowLayout from "../row-layout.component";
import { useThemeContext } from "src/contexts/theme.context";
const AppSettings = () => {
  const { isDarkMode, toggleDarkMode } = useThemeContext();

  return (
    <div>
      <h3 className="font-semibold py-3 px-2.5 border-y border-y-[var(--color-grey-500)]">
        App settings
      </h3>
      <div className="px-3">
        {/* Gender */}
        <RowLayout title="Theme">
          <form className="flex gap-5">
            <InputRadio
              label="Dark Mode"
              name="theme"
              id="dark-mode"
              onChange={() => toggleDarkMode()}
              defaultChecked={isDarkMode}
            />
            <InputRadio
              label="Light Mode"
              name="theme"
              id="light-mode"
              onChange={() => toggleDarkMode()}
              defaultChecked={!isDarkMode}
            />
          </form>
        </RowLayout>
        <RowLayout title="Language">
          <form className="flex gap-5">
            <div className="flex flex-col gap-1">
              <label className="cursor-pointer" htmlFor="vietnamese">
                <img className="w-10 h-10" src={VietNamIcon} alt="Vietnamese" />
              </label>
              <input
                className="cursor-pointer"
                name="language"
                type="radio"
                id="vietnamese"
                defaultChecked
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="cursor-pointer" htmlFor="english">
                <img className="w-10 h-10" src={UsaIcon} alt="english" />
              </label>
              <input
                className="cursor-pointer"
                name="language"
                type="radio"
                id="english"
              />
            </div>
          </form>
        </RowLayout>
      </div>
    </div>
  );
};
export default AppSettings;

import { useTranslation } from "react-i18next";
import switchSound from "src/assets/mp3/lamp_switch.mp3";
import InputRadio from "src/components/input-radio";
import VietNamIcon from "./flag-for-flag-vietnam-svgrepo-com.svg";
import UsaIcon from "./flag-us-svgrepo-com.svg";
import RowLayout from "../row-layout.component";
import { useThemeContext } from "src/contexts/theme.context";
import Button from "src/components/button";
import { useLogout } from "src/hooks/useAuth";
import i18n from "src/i18";
import useSound from "src/hooks/useSound.hook";
import { setItem } from "src/utils/browser.util";
import { LocalStorage } from "src/constants/browser.constant";
const AppSettings = () => {
  const { t } = useTranslation("settings");
  const currentLanguage = i18n.language;
  const { play } = useSound(switchSound);
  const { isDarkMode, toggleDarkMode } = useThemeContext();
  const { logout, isLoading: isLoggingOut } = useLogout();
  const changeLanguage = (val: "en" | "vi") => {
    i18n.changeLanguage(val);
    setItem(LocalStorage.language, val);
    play();
  };
  return (
    <div>
      <h3 className="font-semibold py-3 px-2.5 border-y border-y-[var(--color-grey-500)]">
        {t("appSettings")}
      </h3>
      <div className="px-3 mt-4">
        {/* Gender */}
        <RowLayout title="Theme">
          <form className="flex gap-5">
            <InputRadio
              label={t("darkMode")}
              name="theme"
              id="dark-mode"
              onChange={() => toggleDarkMode()}
              defaultChecked={isDarkMode}
            />
            <InputRadio
              label={t("lightMode")}
              name="theme"
              id="light-mode"
              onChange={() => toggleDarkMode()}
              defaultChecked={!isDarkMode}
            />
          </form>
        </RowLayout>
        <RowLayout title={t("languages")}>
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
                onChange={() => changeLanguage("vi")}
                checked={currentLanguage === "vi"}
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
                onChange={() => changeLanguage("en")}
                id="english"
                checked={currentLanguage === "en"}
              />
            </div>
          </form>
        </RowLayout>
        <Button
          disabled={isLoggingOut}
          onClick={() => logout()}
          variation="danger"
        >
          {t("logout")}
        </Button>
      </div>
    </div>
  );
};
export default AppSettings;

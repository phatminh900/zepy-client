/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect, createContext } from "react";
import { LocalStorage } from "src/constants/browser.constant";
import useLocalStorage from "src/hooks/useLocalStorage";

interface IThemeContext {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
const ThemeContext = createContext<null | IThemeContext>(null);

const isUserDarkTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const ThemeContextProvider = ({ children }: Children) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage(
    LocalStorage.isDarkMode,
    isUserDarkTheme
  );
  const toggleDarkMode = () => setIsDarkMode((prev: boolean) => !prev);
  useEffect(() => {
    const htmlEl = document.documentElement;
    if (isDarkMode) {
      htmlEl.classList.add("dark-mode");
      htmlEl.classList.remove("light-mode");
      return;
    }
    htmlEl.classList.add("light-mode");
    htmlEl.classList.remove("dark-mode");
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ toggleDarkMode, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error(
      "You're using theme context outside of theme context provider"
    );
  return ctx;
};
export default ThemeContextProvider;

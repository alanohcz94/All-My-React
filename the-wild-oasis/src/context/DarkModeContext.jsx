import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const windowsKnowIfYouBrowserIsInDarkModeOrNot = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  // console.log(windowsKnowIfYouBrowserIsInDarkModeOrNot);
  const [isDark, setIsDark] = useLocalStorageState(
    windowsKnowIfYouBrowserIsInDarkModeOrNot,
    "isDark"
  );

  useEffect(() => {
    if (!isDark) {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    } else {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    }
  }, [isDark]);

  function toggle() {
    setIsDark((dark) => !dark);
  }

  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };

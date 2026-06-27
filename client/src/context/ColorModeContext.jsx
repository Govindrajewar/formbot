import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "formBotColorMode";
const ColorModeContext = createContext(null);

export function ColorModeProvider({ children }) {
  const [colorMode, setColorMode] = useState(
    () => localStorage.getItem(STORAGE_KEY) || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", colorMode);
    localStorage.setItem(STORAGE_KEY, colorMode);
  }, [colorMode]);

  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  return useContext(ColorModeContext);
}

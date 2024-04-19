"use client";

import { PaletteMode } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeSelectorProviderProps = {
  children: React.ReactNode;
};

type ThemeSelectorContext = {
  mode: PaletteMode;
  toggleTheme: () => void;
};

export const ThemeSelectorContext = createContext<ThemeSelectorContext | null>(
  null
);

export const ThemeSelectorProvider = ({
  children,
}: ThemeSelectorProviderProps) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  const toggleTheme = () => {
    if (mode === "light") {
      setMode("dark");
      window.localStorage.setItem("open-jira", "dark");
    } else {
      setMode("light");
      window.localStorage.setItem("open-jira", "light");
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem(
      "open-jira"
    ) as PaletteMode | null;

    if (localTheme) {
      setMode(localTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setMode("dark");
    }
  }, []);

  return (
    <ThemeSelectorContext.Provider
      value={{
        mode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeSelectorContext.Provider>
  );
};

export const useThemeSelectorContext = () => {
  const ctx = useContext(ThemeSelectorContext);

  if (ctx === null) {
    throw new Error(
      "ThemeSelectorContext must be used within an ThemeSelectorProvider"
    );
  }

  return ctx;
};

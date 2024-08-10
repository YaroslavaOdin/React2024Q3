"use client";

import { useState } from "react";
import ThemeContext from "./themeContext";
import { defaultTheme, themeDark, themeLight } from "./constants";
import { ThemeProps } from "../utils/model";

export const ThemeProvider = ({ children }: ThemeProps): JSX.Element => {
  const [theme, setTheme] = useState<string>(defaultTheme.theme);

  const changeTheme = (): void => {
    setTheme((prevTheme) => {
      return prevTheme === themeLight ? themeDark : themeLight;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

import { createContext } from "react";
import { defaultTheme } from "./constants";
import { ThemeContextType } from "../utils/model";

const ThemeContext = createContext<ThemeContextType>(defaultTheme);

export default ThemeContext;

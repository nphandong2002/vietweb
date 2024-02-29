"use client";

import { useContext } from "react";
import { ThemeContext } from "../theme/theme-context";

// ----------------------------------------------------------------------

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error("useThemeContext context must be use inside ThemeProvider");

  return context;
};

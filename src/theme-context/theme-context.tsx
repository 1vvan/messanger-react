import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material";

export const tokens = (mode: string) => ({
  ...(mode === "dark"
    ? {
        background: {
          light: "#293646",
          primary: "#1A222C",
          darked: "#1a222c",
        },
        font: {
          light: "#fff",
          primary: "#fff",
          dark: "#000",
        },
      }
    : {
        background: {
          light: "#fff",
          primary: "#fff",
          darked: "#FAFAFA",
        },
        font: {
          light: "#000000a6",
          primary: "#000",
          dark: "#00000073",
        },
      }),
});

export const themeSettings: any = (mode: string) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            background: {
              dark: colors.background.darked,
              primary: colors.background.primary,
              light: colors.background.light,
            },
            font: {
              primary: colors.font.primary,
              dark: colors.font.dark,
            },
          }
        : {
            background: {
              dark: colors.background.darked,
              primary: colors.background.primary,
              light: colors.background.light,
            },
            font: {
              primary: colors.font.primary,
              dark: colors.font.dark,
            },
          }),
    },
    typography: {
      fontFamily: ["SF Pro Display", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["SF Pro Display", "sans-serif"].join(","),
        fontSize: 40,
        fontWeight: 600,
      },
      h2: {
        fontFamily: ["SF Pro Display", "sans-serif"].join(","),
        fontSize: 35,
        fontWeight: 600,
      },
      h3: {
        fontFamily: ["SF Pro Display", "sans-serif"].join(","),
        fontSize: 30,
        fontWeight: 500,
      },
      h4: {
        fontFamily: ["SF Pro Display", "sans-serif"].join(","),
        fontSize: 25,
        fontWeight: 500,
      },
      p: {
        fontFamily: ["SF Pro Display", "sans-serif"].join(","),
        fontSize: 20,
      },
    },
  };
};

export const ColorModeContext = createContext<{
  mode: string;
  toggleColorMode: () => void;
}>({
  mode: "dark",
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState<string>(() => {
    const storedMode = localStorage.getItem("themeMode");
    return storedMode || "light";
  });

  const toggleColorMode = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  };

  const theme: any = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return {
    theme: theme,
    toggleColorMode: toggleColorMode,
    mode: mode,
  };
};

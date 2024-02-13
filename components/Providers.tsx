"use client";

import { ReactNode, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import React from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { PaletteMode, useMediaQuery } from "@mui/material";
import { useCookies } from "react-cookie";
import { changeThemeCookie } from "../serverActions/actions";

interface Props {
  children: ReactNode;
  cookieTheme: string | undefined;
}

// default MUI Light Theme
// const lightTheme = createTheme({
//   palette: {
//     mode: "light",
//   },
// });
// default MUI Dark Theme
// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

// Custom Theme
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#0c47a1",
            btnTxt: "#000000",
            footer: "#131313f5",
          },
          secondary: {
            main: "#1a76d2",
          },
          background: {
            default: "#FFFFFF",
            paper: "white",
          },
          text: {
            primary: "#000000",
            secondary: "#000000",
            navBar: "#FFFFFF",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#1566c1",
            btnTxt: "#eee",
            footer: "#0b0e11",
          },
          secondary: {
            main: "#90cbfa",
          },
          background: {
            default: "#0f1418",
            paper: "#0f1418",
          },
          text: {
            primary: "#6c7a90",
            secondary: "#FFFFFF",
          },
        }),
  },
});

const Providers = ({ children, cookieTheme }: Props) => {
  // to get system-theme cookie to decide if you will use system or selected Theme from User
  const [systemCookie, setSystemCookie] = useCookies(["system-theme"]);
  // to get theme of Device
  let systemTheme = useMediaQuery("(prefers-color-scheme: dark)");
  // to create the Custom Theme only cookieTheme changes not on every re-render
  const customTheme = React.useMemo(
    () => createTheme(getDesignTokens(cookieTheme as PaletteMode)),
    [cookieTheme]
  );
  // to change theme to device theme if system-theme cookie is "yes"
  useEffect(() => {
    if (systemCookie["system-theme"] === "no") return;
    changeThemeCookie(systemTheme ? "dark" : "light");
  }, [systemTheme, systemCookie]);

  return (
    // <MuiThemeProvider theme={cookieTheme === "dark" ? darkTheme : lightTheme}>
    <MuiThemeProvider theme={customTheme}>
      <SessionProvider>{children}</SessionProvider>
    </MuiThemeProvider>
  );
};

export default Providers;

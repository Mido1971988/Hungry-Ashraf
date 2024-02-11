"use client";

import { ReactNode, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import React from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { CssBaseline, PaletteMode, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";
import {
  amber,
  blue,
  blueGrey,
  deepOrange,
  grey,
  red,
  yellow,
} from "@mui/material/colors/";

interface Props {
  children: ReactNode;
  cookieTheme: string | undefined;
}

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

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
  const router = useRouter();
  const [cookieValue, setCookieTheme] = useCookies(["theme-preference"]);
  const [systemCookie, setSystemCookie] = useCookies(["system-theme"]);
  let systemTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const customTheme = React.useMemo(
    () => createTheme(getDesignTokens(cookieTheme as PaletteMode)),
    [cookieTheme]
  );
  useEffect(() => {
    if (systemCookie["system-theme"] === "no") return;
    setCookieTheme("theme-preference", systemTheme ? "dark" : "light");
    router.refresh();
  }, [systemTheme]);

  return (
    // <MuiThemeProvider theme={cookieTheme === "dark" ? darkTheme : lightTheme}>
    <MuiThemeProvider theme={customTheme}>
      <SessionProvider>{children}</SessionProvider>
    </MuiThemeProvider>
  );
};

export default Providers;

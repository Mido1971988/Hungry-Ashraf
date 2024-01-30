"use client";

import { ReactNode, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import React from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

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

const Providers = ({ children, cookieTheme }: Props) => {
  const router = useRouter();
  const [cookieValue, setCookieTheme] = useCookies(["theme-preference"]);
  const systemTheme = useMediaQuery("(prefers-color-scheme: dark)");
  useEffect(() => {
    setCookieTheme("theme-preference", systemTheme ? "dark" : "light");
    router.refresh();
  }, [systemTheme]);

  return (
    <MuiThemeProvider theme={cookieTheme === "dark" ? darkTheme : lightTheme}>
      <SessionProvider>{children}</SessionProvider>
    </MuiThemeProvider>
  );
};

export default Providers;

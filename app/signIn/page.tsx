"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import { useCookies } from "react-cookie";

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

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

const PREFERENCE_COOKIE_NAME = "theme-preference";

export default function SignIn(props: Props) {
  const router = useRouter();

  let userName = "";
  let pass = "";
  // refs to Clear Input Fields after Signing in
  let userInput = useRef<HTMLInputElement>(null);
  let passInput = useRef<HTMLInputElement>(null);

  let [unAuth, setUnAuth] = useState<boolean | string>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (userInput && userInput.current) userInput.current.value = "";
    if (passInput && passInput.current) passInput.current.value = "";
    e.preventDefault();

    await signIn("credentials", {
      username: userName,
      password: pass,
      redirect: false,
    }).then((res) => {
      if (res?.error) {
        // toast.error("User and Pass are wrong");
        setUnAuth("User and Pass are wrong");
      } else {
        setUnAuth(false);
        router.push(props.callbackUrl ?? "/");
      }
    });
  };

  const [cookieTheme, setCookieTheme] = useCookies([PREFERENCE_COOKIE_NAME]);
  const systemTheme = useMediaQuery("(prefers-color-scheme: dark)");
  useEffect(() => {
    setCookieTheme(PREFERENCE_COOKIE_NAME, systemTheme ? "dark" : "light");
    router.refresh();
  }, [systemTheme]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ height: "calc(100vh - 64px)" }}
    >
      {/* <CssBaseline /> */}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            autoFocus
            name="username"
            label="User Name"
            inputRef={userInput}
            onChange={(e) => (userName = e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            type="password"
            label="Password"
            inputRef={passInput}
            onChange={(e) => (pass = e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

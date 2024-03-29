"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "@mui/material";
import RightDrawer from "@/components/RightDrawer";
import { IoSettingsOutline } from "react-icons/io5";

export default function SignIn() {
  // to push to homepage when successfully sign in
  const router = useRouter();
  // to change theme on ToastContainer
  const isDark = useMediaQuery("(prefers-color-scheme: dark");
  // to handle opening and closing right Drawer
  const [openRightDrawer, setOpenRightDrawer] = useState(false);

  let userName = "";
  let pass = "";
  // refs to Clear Input Fields after Signing in
  let userInput = useRef<HTMLInputElement>(null);
  let passInput = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // refs to Clear Input Fields after submitting
    if (userInput && userInput.current) userInput.current.value = "";
    if (passInput && passInput.current) passInput.current.value = "";
    e.preventDefault();

    await signIn("credentials", {
      username: userName,
      password: pass,
      redirect: false,
    }).then((res) => {
      if (res?.error) {
        toast.error("User and Pass are wrong");
      } else {
        router.push("/", { scroll: false });
      }
    });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        minHeight: "calc(100svh - 64px)",
      }}
    >
      <RightDrawer
        openRightDrawer={openRightDrawer}
        setOpenRightDrawer={setOpenRightDrawer}
      />
      <Button
        color="inherit"
        id="burger"
        aria-controls={openRightDrawer ? "rightDrawer" : undefined}
        aria-expanded={openRightDrawer ? "true" : undefined}
        aria-haspopup="true"
        onClick={() => setOpenRightDrawer(true)}
        sx={{
          textTransform: "uppercase",
          fontFamily: "revert-layer",
          fontWeight: "bold",
          position: "absolute",
          top: "0",
          right: "0",
        }}
      >
        <IoSettingsOutline size={20} />
      </Button>
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
        <Typography component="h1" variant="h5" color="primary.btnTxt">
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
            sx={{
              "& .MuiInputBase-input": {
                color: "primary.btnTxt",
              },
            }}
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
            sx={{
              "& .MuiInputBase-input": {
                color: "primary.btnTxt",
              },
            }}
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
      <ToastContainer
        hideProgressBar
        draggable={false}
        theme={isDark ? "dark" : "light"}
        position="bottom-center"
      ></ToastContainer>
    </Container>
  );
}

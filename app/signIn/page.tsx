"use client";
// import React, { useRef, useState } from "react";
// import Link from "next/link";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { TextField, Typography } from "@mui/material";
// import { Modal } from "@/components/Modal";
// import { fontSize } from "@mui/system";
// // import { toast } from "react-toastify";

// // will be be props only if redirect : true in signIn (in Login.tsx)
// type Props = {
//   className?: string;
//   callbackUrl?: string;
//   error?: string;
// };

// const SignIn = (props: Props) => {
//   const router = useRouter();
//   let userName = "";
//   let pass = "";
//   // refs to Clear Input Fields after Signing in
//   let userInput = useRef<HTMLInputElement>(null);
//   let passInput = useRef<HTMLInputElement>(null);

//   let [unAuth, setUnAuth] = useState<boolean | string>(false);

//   // Yup Validation
//   //   const validationSchema = Yup.object({
//   //     username: Yup.string().required("Required!"),
//   //     password: Yup.string().required("Required!"),
//   //   });

//   // to Handle Click on Sign In Button
//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     if (userInput && userInput.current) userInput.current.value = "";
//     if (passInput && passInput.current) passInput.current.value = "";
//     e.preventDefault();

//     await signIn("credentials", {
//       username: userName,
//       password: pass,
//       redirect: false,
//     }).then((res) => {
//       if (res?.error) {
//         // toast.error("User and Pass are wrong");
//         setUnAuth("User and Pass are wrong");
//       } else {
//         setUnAuth(false);
//         router.push(props.callbackUrl ?? "/");
//       }
//     });
//   };

//   return (
//     <Modal>
//       <div>
//         <div>Login Form</div>
//         {unAuth && <p>{unAuth}</p>}

//         <form onSubmit={onSubmit}>
//           <TextField
//             name="username"
//             label="User Name"
//             inputRef={userInput}
//             onChange={(e) => (userName = e.target.value)}
//           />
//           <TextField
//             name="password"
//             type="password"
//             label="Password"
//             inputRef={passInput}
//             onChange={(e) => (pass = e.target.value)}
//           />
//           <div>
//             <button type="submit">Sign In</button>
//             <Link href={props.callbackUrl ?? "/"}>Cancel</Link>
//           </div>
//         </form>
//       </div>
//     </Modal>
//   );
// };

// export default SignIn;

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
import { NoSsr, useMediaQuery } from "@mui/material";

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

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

  const isDark = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDark ? "dark" : "light",
        },
      }),
    [isDark]
  );

  return (
    <NoSsr defer={true}>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{ height: "calc(100vh - 64px)" }}
        >
          <CssBaseline />
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
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
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
      </ThemeProvider>
    </NoSsr>
  );
}

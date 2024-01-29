"use client";

import {
  AppBar,
  Button,
  CssBaseline,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { useEffect, useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import NavMenu from "./NavMenu";
import { useSession } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

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
export default function Navbar() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data: session } = useSession();

  const foodList = {
    breakfast: ["Egg", " Foul"],
    launch: ["Chicken", " Meat", "Fish"],
    dinner: ["labnah", "Zaatar"],
  };

  const [cookieTheme, setCookieTheme] = useCookies([PREFERENCE_COOKIE_NAME]);
  const systemTheme = useMediaQuery("(prefers-color-scheme: dark)");
  useEffect(() => {
    setCookieTheme(PREFERENCE_COOKIE_NAME, systemTheme ? "dark" : "light");
    router.refresh();
  }, [systemTheme]);

  return (
    // <ThemeProvider theme={darkTheme}>
    <AppBar sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
        <Stack direction="row" width="100%" justifyContent="space-between">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              gap: {
                xs: 0,
                sm: "5px",
              },
            }}
          >
            <FastfoodIcon />
            <Typography sx={{ fontSize: { xs: "12px", sm: "16px" } }}>
              Hungry {session && session.user ? "loggedUser" : "Ashraf"}
            </Typography>
          </IconButton>
          {session && session.user ? (
            <Stack direction="row">
              <Button
                color="inherit"
                id="breakfast"
                aria-controls={open ? "breakfast" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                endIcon={<KeyboardArrowDown />}
                onClick={handleClick}
                sx={{ fontSize: { xs: "12px", sm: "14px" } }}
              >
                Breakfast
              </Button>
              <Button
                color="inherit"
                id="launch"
                aria-controls={open ? "launch" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                endIcon={<KeyboardArrowDown />}
                onClick={handleClick}
                sx={{ fontSize: { xs: "12px", sm: "14px" } }}
              >
                Launch
              </Button>
              <Button
                color="inherit"
                id="dinner"
                aria-controls={open ? "dinner" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                endIcon={<KeyboardArrowDown />}
                onClick={handleClick}
                sx={{ fontSize: { xs: "12px", sm: "14px" } }}
              >
                Dinner
              </Button>
            </Stack>
          ) : (
            <Button color="inherit" size="large" href="./signIn">
              Login
            </Button>
          )}
        </Stack>
        <NavMenu
          id="breakfast"
          anchorEl={anchorEl}
          open={open && anchorEl?.id === "breakfast"}
          onClose={handleClose}
          foodList={foodList.breakfast}
        />
        <NavMenu
          id="launch"
          anchorEl={anchorEl}
          open={open && anchorEl?.id === "launch"}
          onClose={handleClose}
          foodList={foodList.launch}
        />
        <NavMenu
          id="dinner"
          anchorEl={anchorEl}
          open={open && anchorEl?.id === "dinner"}
          onClose={handleClose}
          foodList={foodList.dinner}
        />
      </Toolbar>
    </AppBar>
    // </ThemeProvider>
  );
}

"use client";

import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
// import { KeyboardArrowDown } from "@mui/icons-material";
import NavMenu from "./NavMenu";
import AlertDialog from "./Dialog";
import { Session } from "next-auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { GrSystem } from "react-icons/gr";
import { MdOutlineWbSunny, MdOutlineDarkMode } from "react-icons/md";

export default function Navbar({
  session,
  cookieTheme,
  children,
}: {
  session: Session | null;
  cookieTheme: string;
  children: React.ReactElement[];
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const open = Boolean(anchorEl);
  const [cookieValue, setCookieTheme] = useCookies(["theme-preference"]);
  const [systemCookie, setSystemCookie] = useCookies(["system-theme"]);
  let systemTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleSignOut = () => {
    setOpenDialog(true);
  };

  const foodList = {
    breakfast: ["Egg", " Foul"],
    launch: ["Chicken", " Meat", "Fish"],
    dinner: ["labnah", "Zaatar"],
  };

  useEffect(() => {
    if (session?.user?.name === undefined) return;
    toast.error(children[1].props.id, {
      icon: children[1],
    });
  }, []);

  return (
    <AppBar sx={{ bgcolor: "primary.dark" }}>
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
            {children[0]}
            <Typography sx={{ fontSize: { xs: "12px", sm: "16px" } }}>
              {session && session.user ? session?.user.name : "Hungry Ashraf"}
            </Typography>
          </IconButton>

          <Stack direction="row">
            <Button
              color="inherit"
              id="random-meal"
              aria-controls={open ? "breakfast" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              sx={{ fontSize: { xs: "12px", sm: "14px" } }}
            >
              Random Meal
            </Button>
            <Button
              color="inherit"
              id="theme"
              aria-controls={open ? "dinner" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              sx={{ fontSize: { xs: "12px", sm: "14px" } }}
            >
              Theme
            </Button>
            <AlertDialog
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
            />
            {session && session.user ? (
              <Button
                color="inherit"
                id="signOut"
                onClick={handleSignOut}
                sx={{ fontSize: { xs: "12px", sm: "14px" } }}
              >
                Sign Out
              </Button>
            ) : (
              <Button color="inherit" size="large" href="./signIn">
                Login
              </Button>
            )}
          </Stack>
        </Stack>
        <Menu
          id="theme"
          anchorEl={anchorEl}
          open={open}
          onClose={() => {
            setAnchorEl(null);
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          MenuListProps={{ "aria-labelledby": "breakfast" }}
        >
          <MenuItem
            onClick={() => {
              setCookieTheme("theme-preference", "dark");
              setSystemCookie("system-theme", "no");
              setAnchorEl(null);
              router.refresh();
            }}
            key="dark-theme"
            sx={{ width: "105px", justifyContent: "space-between" }}
          >
            <MdOutlineDarkMode /> <span>Dark</span>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setCookieTheme("theme-preference", "light");
              setSystemCookie("system-theme", "no");
              setAnchorEl(null);
              router.refresh();
            }}
            key="light-theme"
            sx={{ width: "105px", justifyContent: "space-between" }}
          >
            <MdOutlineWbSunny /> <span>Light</span>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSystemCookie("system-theme", "yes");
              setCookieTheme(
                "theme-preference",
                systemTheme ? "dark" : "light"
              );
              setAnchorEl(null);
              router.refresh();
            }}
            key="system-theme"
            sx={{ width: "105px", justifyContent: "space-between" }}
          >
            <GrSystem /> <span>System</span>
          </MenuItem>
        </Menu>
      </Toolbar>
      <ToastContainer
        hideProgressBar
        draggable={false}
        theme={cookieTheme}
        position="bottom-center"
        style={{ textAlign: "center" }}
      ></ToastContainer>
    </AppBar>
  );
}

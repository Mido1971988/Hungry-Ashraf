"use client";

import {
  AppBar,
  Button,
  Drawer,
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
import MuiDrawer from "./MuiDrawer";

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
  const [openDrawer, setOpenDrawer] = useState(false);
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
    <AppBar sx={{ bgcolor: "primary.dark", height: "64px" }}>
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
            onClick={() => setOpenDrawer(true)}
          >
            {children[0]}
            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "14px" },
                fontFamily: "revert-layer",
                fontWeight: "bold",
              }}
            >
              {session && session.user ? session?.user.name : "Hungry Ashraf"}
            </Typography>
          </IconButton>

          <Stack direction="row">
            {session && session.user && (
              <Button
                color="inherit"
                id="random-meal"
                aria-controls={open ? "random-meal" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                sx={{
                  textTransform: "uppercase",
                  fontFamily: "revert-layer",
                  fontWeight: "bold",
                }}
              >
                Random Meal
              </Button>
            )}
            <Button
              color="inherit"
              id="theme"
              aria-controls={open ? "theme" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              sx={{
                textTransform: "uppercase",
                fontFamily: "revert-layer",
                fontWeight: "bold",
              }}
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
                sx={{
                  textTransform: "uppercase",
                  fontFamily: "revert-layer",
                  fontWeight: "bold",
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                color="inherit"
                href="./signIn"
                sx={{
                  textTransform: "uppercase",
                  fontFamily: "revert-layer",
                  fontWeight: "bold",
                }}
              >
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
            sx={{ width: "110px" }}
          >
            <MdOutlineDarkMode />{" "}
            <span style={{ marginLeft: "10px" }}>Dark</span>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setCookieTheme("theme-preference", "light");
              setSystemCookie("system-theme", "no");
              setAnchorEl(null);
              router.refresh();
            }}
            key="light-theme"
            sx={{ width: "110px" }}
          >
            <MdOutlineWbSunny />{" "}
            <span style={{ marginLeft: "10px" }}>Light</span>
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
            sx={{ width: "110px" }}
          >
            <GrSystem /> <span style={{ marginLeft: "10px" }}>System</span>
          </MenuItem>
        </Menu>
      </Toolbar>
      <MuiDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <ToastContainer
        hideProgressBar
        draggable={false}
        theme={cookieTheme}
        position="bottom-center"
        style={{
          textAlign: "center",
          fontFamily: "revert-layer",
          fontWeight: "bold",
        }}
      ></ToastContainer>
    </AppBar>
  );
}

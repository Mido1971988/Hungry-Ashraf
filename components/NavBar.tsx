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
import AlertDialog from "./Dialog";
import { Session } from "next-auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { GrSystem } from "react-icons/gr";
import { MdOutlineWbSunny, MdOutlineDarkMode } from "react-icons/md";
import MuiDrawer from "./MuiDrawer";
import { changeCookie, changeNumCookie } from "@/serverActions/actions";
import { foodList } from "@/myData/foodList";
import type { FoodList } from "@/myData/foodList";

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
  // const [cookieRandom, setCookieRandom] = useCookies(["random-meal-button"]);
  const [openDrawer, setOpenDrawer] = useState(false);
  let systemTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleSignOut = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    if (session?.user?.name === undefined) return;
    toast.error(children[1].props.id, {
      icon: children[1],
    });
  }, []);

  const regx = /(?<=media\/).*?(?=\.)/gm;
  let randomFoodNum = "0";
  if (session?.user?.name) {
    randomFoodNum = Math.floor(
      Math.random() * foodList[session?.user?.name as keyof FoodList].length
    ).toString();
  }

  useEffect(() => {
    changeCookie("false");
  }, [session?.user?.name]);
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
              <>
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
                  onClick={() => {
                    // using useCookies hook and router.refresh()
                    // setCookieRandom("random-meal-button", "true");
                    // router.refresh();

                    // using server actions and revalidatePath("/")
                    changeCookie("true");
                    changeNumCookie(randomFoodNum);
                  }}
                >
                  Random Meal
                </Button>
                <Button
                  color="inherit"
                  id="all-meals"
                  aria-controls={open ? "all-meals" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  sx={{
                    textTransform: "uppercase",
                    fontFamily: "revert-layer",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    // setCookieRandom("random-meal-button", "false");
                    // router.refresh();
                    changeCookie("false");
                  }}
                >
                  All Meals
                </Button>
              </>
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

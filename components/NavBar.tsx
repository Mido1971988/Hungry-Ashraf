"use client";

import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AlertDialog from "./Dialog";
import { Session } from "next-auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LeftDrawer from "./LeftDrawer";
import RightDrawer from "./RightDrawer";
import {
  changeCookie,
  changeNumCookie,
  loading,
} from "../serverActions/actions";
import { foodList } from "../myData/foodList";
import type { FoodList } from "../myData/foodList";
import { IoSettingsOutline } from "react-icons/io5";

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
  // const [cookieRandom, setCookieRandom] = useCookies(["random-meal-button"]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const initialRenderRef = useRef(true);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleSignOut = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    if (session?.user?.name === undefined) return;
    if (initialRenderRef) {
      initialRenderRef.current = false;
      toast.error(children[1].props.id, {
        icon: children[1],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const [openRightDrawer, setOpenRightDrawer] = useState(false);

  return (
    <AppBar
      sx={{
        bgcolor: "#043363",
        height: "64px",
        color: "#eee",
        backgroundColor: "primary.main",
      }}
    >
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
            onClick={() => {
              if (session?.user) {
                setOpenDrawer(true);
              } else {
                toast.error("Sign in to Show Profile Page");
              }
            }}
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
            {session && session.user ? (
              <>
                <Button
                  color="inherit"
                  id="random-meal"
                  aria-controls={open ? "random-meal" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  sx={{
                    textTransform: "none",
                    fontFamily: "revert-layer",
                    fontWeight: "bold",
                  }}
                  onClick={async () => {
                    // using useCookies hook and router.refresh()
                    // setCookieRandom("random-meal-button", "true");
                    // changeNumCookie(randomFoodNum);
                    // router.refresh();

                    // using server actions and revalidatePath("/")
                    changeCookie("true");
                    changeNumCookie(randomFoodNum);
                    loading("true");
                    setTimeout(() => loading("false"), 3000);
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
                    textTransform: "none",
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
            <AlertDialog
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
            />
            <Button
              color="inherit"
              id="burger"
              aria-controls={open ? "burger" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={() => setOpenRightDrawer(true)}
              sx={{
                textTransform: "uppercase",
                fontFamily: "revert-layer",
                fontWeight: "bold",
              }}
            >
              <IoSettingsOutline size={20} />
            </Button>
          </Stack>
        </Stack>
      </Toolbar>
      <RightDrawer
        openRightDrawer={openRightDrawer}
        setOpenRightDrawer={setOpenRightDrawer}
      />
      <LeftDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        session={session}
        setOpenDialog={setOpenDialog}
      />
    </AppBar>
  );
}

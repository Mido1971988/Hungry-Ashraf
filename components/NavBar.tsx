"use client";

import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeftDrawer from "./LeftDrawer";
import RightDrawer from "./RightDrawer";
import {
  changeNumCookie,
  changeRandomCookie,
  loading,
} from "../serverActions/actions";
import { foodList } from "../myData/foodList";
import type { FoodList } from "../myData/foodList";
import { IoSettingsOutline } from "react-icons/io5";
import React from "react";
import AlertDialog from "./Dialog";

export default function Navbar({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactElement[];
}) {
  // to handle opening and closing of right drawer
  const [openRightDrawer, setOpenRightDrawer] = useState(false);
  // to handle opening and closing of left drawer
  const [openLeftDrawer, setOpenLeftDrawer] = useState(false);
  // to handle opening and closing dialog of sign out
  const [openDialog, setOpenDialog] = useState(false);
  // if you will use 1st option when you press on Random meal button
  // const [cookieRandom, setCookieRandom] = useCookies(["random-meal-button"]);

  // toast when you return to home page after sigining in
  useEffect(() => {
    if (session?.user?.name === undefined) return;
    toast.error(children[1].props.id, {
      icon: children[1],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // create random number to pass it to cookies
  let randomFoodNum = "0";
  if (session?.user?.name) {
    randomFoodNum = Math.floor(
      Math.random() * foodList[session?.user?.name as keyof FoodList].length
    ).toString();
  }

  // to change random button
  useEffect(() => {
    changeRandomCookie("false");
  }, [session?.user?.name]);

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
                setOpenLeftDrawer(true);
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
                  aria-haspopup="true"
                  sx={{
                    textTransform: "none",
                    fontFamily: "revert-layer",
                    fontWeight: "bold",
                  }}
                  onClick={async () => {
                    // 1st option : using useCookies hook and router.refresh()
                    // setCookieRandom("random-meal-button", "true");
                    // changeNumCookie(randomFoodNum);
                    // router.refresh();

                    // 2nd option :  using server actions and revalidatePath("/")
                    changeRandomCookie("true");
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
                  aria-haspopup="true"
                  sx={{
                    textTransform: "none",
                    fontFamily: "revert-layer",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    // setCookieRandom("random-meal-button", "false");
                    // router.refresh();
                    changeRandomCookie("false");
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
            <Button
              color="inherit"
              id="burger"
              aria-controls={openRightDrawer ? "burger" : undefined}
              aria-expanded={openRightDrawer ? "true" : undefined}
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
        openLeftDrawer={openLeftDrawer}
        setOpenLeftDrawer={setOpenLeftDrawer}
        session={session}
        setOpenDialog={setOpenDialog}
      />
      <AlertDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </AppBar>
  );
}

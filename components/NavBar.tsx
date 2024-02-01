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
// import { KeyboardArrowDown } from "@mui/icons-material";
import NavMenu from "./NavMenu";
import AlertDialog from "./Dialog";
import { Session } from "next-auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          {session && session.user ? (
            <Stack direction="row">
              <Button
                color="inherit"
                id="breakfast"
                aria-controls={open ? "breakfast" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                // endIcon={<KeyboardArrowDown />}
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
                // endIcon={<KeyboardArrowDown />}
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
                // endIcon={<KeyboardArrowDown />}
                onClick={handleClick}
                sx={{ fontSize: { xs: "12px", sm: "14px" } }}
              >
                Dinner
              </Button>
              <Button
                color="inherit"
                id="signOut"
                onClick={handleSignOut}
                sx={{ fontSize: { xs: "12px", sm: "14px" } }}
              >
                Sign Out
              </Button>
              <AlertDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
              />
            </Stack>
          ) : (
            <>
              <Button color="inherit" size="large" href="./signIn">
                Login
              </Button>
            </>
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

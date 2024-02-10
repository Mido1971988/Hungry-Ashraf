"use client";
import { changeThemeCookie, systemThemeCookie } from "@/serverActions/actions";
import {
  Box,
  Button,
  ButtonTypeMap,
  Drawer,
  ExtendButtonBase,
  Hidden,
  Stack,
  Tab,
  Tabs,
  TextField,
  TextareaAutosize,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { GrSystem } from "react-icons/gr";
import { MdOutlineDarkMode, MdOutlineWbSunny } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

export default function RightDrawer({
  openRightDrawer,
  setOpenRightDrawer,
}: {
  openRightDrawer: boolean;
  setOpenRightDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  let systemTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const [cookietheme, setCookietheme] = useCookies(["theme-preference"]);
  const [systemThemecookie, setSystemThemecookiee] = useCookies([
    "system-theme",
  ]);
  const [rateValue, setRateValue] = useState("perfect");

  const [modeValue, setModeValue] = React.useState(
    systemThemecookie["system-theme"] === "no"
      ? cookietheme["theme-preference"]
      : "system"
  );

  const handleRateChange = (event: React.SyntheticEvent, newValue: string) => {
    setRateValue(newValue);
    if (newValue === "perfect") {
      toast.success("تشكر يا ذوق شكلك بتفهم");
    } else if (newValue === "good") {
      toast.info("شغال يعني ؟ ماشي يا عم تشكر برضة");
    } else if (newValue === "bad") {
      toast.error("رايك يهمنا طبعا.. ياخبر", { icon: <FaRegTrashAlt /> });
    }
  };
  const handleModeChange = (event: React.SyntheticEvent, newValue: string) => {
    setModeValue(newValue);
    if (newValue === "system") {
      systemThemeCookie("yes");
      changeThemeCookie(systemTheme ? "dark" : "light");
    } else {
      systemThemeCookie("no");
      changeThemeCookie(newValue);
    }
  };

  return (
    <Drawer anchor="right" open={openRightDrawer}>
      <Stack
        sx={{
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          backgroundColor: "#0f1418",
          height: "100%",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            borderBottom: "1px solid #6c7a90",
            padding: "20px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Gill Sans Extrabold",
              fontWeight: "bold",
              color: "#6c7a90",
              fontSize: "18px",
            }}
          >
            Settings
          </Typography>
          <IoIosArrowForward
            color="#6c7a90"
            style={{ justifyItems: "end" }}
            onClick={() => setOpenRightDrawer(false)}
            size={25}
          />
        </Stack>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            padding: "20px",
            gap: "20px",
          }}
        >
          <Typography
            sx={{
              color: "#6c7a90",
              fontFamily: "IBM Plex Sans",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            Mode
          </Typography>
          <Box
            sx={{
              width: "100%",
              bgcolor: "background.paper",
            }}
          >
            <Tabs
              value={modeValue}
              onChange={handleModeChange}
              centered
              TabIndicatorProps={{
                style: { display: "none" },
              }}
              sx={{ width: "100%" }}
            >
              <Tab
                icon={<MdOutlineDarkMode size={15} />}
                iconPosition="start"
                label="dark"
                sx={{
                  fontSize: "12px",
                  width: "calc(100% / 3)",
                  fontFamily: "IBM Plex Sans",
                  fontWeight: "bold",
                  borderTopLeftRadius: "15px",
                  borderBottomLeftRadius: "15px",
                  border: "1px solid #313741",
                }}
                value={"dark"}
              />
              <Tab
                icon={<GrSystem size={15} />}
                iconPosition="start"
                label="system"
                sx={{
                  fontSize: "12px",
                  width: "calc(100% / 3)",
                  fontFamily: "IBM Plex Sans",
                  fontWeight: "bold",
                  border: "1px solid #313741",
                }}
                value={"system"}
              />
              <Tab
                icon={<MdOutlineWbSunny size={15} />}
                iconPosition="start"
                label="light"
                sx={{
                  fontSize: "12px",
                  width: "calc(100% / 3)",
                  fontFamily: "IBM Plex Sans",
                  fontWeight: "bold",
                  borderTopRightRadius: "15px",
                  borderBottomRightRadius: "15px",
                  border: "1px solid #313741",
                }}
                value={"light"}
              />
            </Tabs>
          </Box>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            padding: "20px",
            gap: "20px",
          }}
        >
          <Typography
            sx={{
              color: "#6c7a90",
              fontFamily: "IBM Plex Sans",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            Rating
          </Typography>
          <Box
            sx={{
              width: "100%",
              bgcolor: "background.paper",
            }}
          >
            <Tabs
              value={rateValue}
              onChange={handleRateChange}
              centered
              TabIndicatorProps={{
                style: { display: "none" },
              }}
              sx={{ width: "100%" }}
            >
              <Tab
                iconPosition="start"
                label="perfect"
                sx={{
                  fontSize: "12px",
                  width: "calc(100% / 3)",
                  fontFamily: "IBM Plex Sans",
                  fontWeight: "bold",
                  borderTopLeftRadius: "15px",
                  borderBottomLeftRadius: "15px",
                  border: "1px solid #313741",
                }}
                value={"perfect"}
              />
              <Tab
                iconPosition="start"
                label="Good"
                sx={{
                  fontSize: "12px",
                  width: "calc(100% / 3)",
                  fontFamily: "IBM Plex Sans",
                  fontWeight: "bold",
                  border: "1px solid #313741",
                }}
                value={"good"}
              />
              <Tab
                iconPosition="start"
                label="bad"
                sx={{
                  fontSize: "12px",
                  width: "calc(100% / 3)",
                  fontFamily: "IBM Plex Sans",
                  fontWeight: "bold",
                  borderTopRightRadius: "15px",
                  borderBottomRightRadius: "15px",
                  border: "1px solid #313741",
                }}
                value={"bad"}
              />
            </Tabs>
          </Box>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            padding: "20px",
            gap: "20px",
          }}
        >
          <Typography
            sx={{
              color: "#6c7a90",
              fontFamily: "IBM Plex Sans",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            Write Your Feedback
          </Typography>
          <TextareaAutosize
            maxRows={3}
            style={{
              height: "100px",
              backgroundColor: "#b1bed3",
              borderRadius: "5px",
              color: "black",
            }}
            ref={textRef}
          />
          <Button
            sx={{
              border: "1px solid #313741",
              color: "white",
              fontFamily: "IBM Plex Sans",
              fontWeight: "bold",
            }}
            onClick={() => {
              if (textRef.current && textRef.current.value) {
                textRef.current.value = "";
                toast.error("Sent To Trash Successfully", {
                  icon: <FaRegTrashAlt />,
                });
              }
            }}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}

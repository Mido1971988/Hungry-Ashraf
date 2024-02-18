"use client";
import { changeThemeCookie, systemThemeCookie } from "../serverActions/actions";
import {
  Box,
  Button,
  Drawer,
  Stack,
  Tab,
  Tabs,
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
import { toast } from "react-toastify";

export default function RightDrawer({
  openRightDrawer,
  setOpenRightDrawer,
}: {
  openRightDrawer: boolean;
  setOpenRightDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // to clear text after submitting and to use them with some if conditions
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  // to get themes of device , theme cookie , system-theme cookie
  let systemTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const [cookietheme, setCookietheme] = useCookies(["theme-preference"]);
  const [systemThemecookie, setSystemThemecookiee] = useCookies([
    "system-theme",
  ]);
  // final value will be used system them or selected theme
  const [modeValue, setModeValue] = React.useState(
    systemThemecookie["system-theme"] === "no"
      ? cookietheme["theme-preference"]
      : "system"
  );

  // useState hook for Rate Tabs
  const [rateValue, setRateValue] = useState("perfect");
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
  // handle function when user click on mode tabs
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
    <Drawer
      anchor="right"
      open={openRightDrawer}
      sx={{
        "& .MuiDrawer-paperAnchorRight": {
          borderTopLeftRadius: "15px",
          borderBottomLeftRadius: "15px",
        },
      }}
    >
      <Stack
        sx={{
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          backgroundColor: "background.default",
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
              color: "primary.btnTxt",
              fontSize: "20px",
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
              bgcolor: "background.default",
            }}
          >
            <Tabs
              value={modeValue}
              onChange={handleModeChange}
              centered
              TabIndicatorProps={{
                style: { display: "none" },
              }}
              sx={{
                width: "100%",
                "& .MuiButtonBase-root.Mui-selected": {
                  backgroundColor:
                    cookietheme["theme-preference"] === "dark"
                      ? "#043363"
                      : "#ecf6ff",
                },
                "& .MuiTabs-scroller": {
                  backgroundColor: "background.default",
                },
                "& .MuiButtonBase-root": {
                  minHeight: "40px",
                },
              }}
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
                  "&.Mui-selected": {
                    border: "1px solid #004c99",
                  },
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
                  "&.Mui-selected": {
                    border: "1px solid #004c99",
                  },
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
                  "&.Mui-selected": {
                    border: "1px solid #004c99",
                  },
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
              sx={{
                width: "100%",
                "& .MuiButtonBase-root.Mui-selected": {
                  backgroundColor:
                    cookietheme["theme-preference"] === "dark"
                      ? "#043363"
                      : "#ecf6ff",
                },
                "& .MuiTabs-scroller": {
                  backgroundColor: "background.default",
                },
                "& .MuiButtonBase-root": {
                  minHeight: "40px",
                },
              }}
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
                  "&.Mui-selected": {
                    border: "1px solid #004c99",
                  },
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
                  "&.Mui-selected": {
                    border: "1px solid #004c99",
                  },
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
                  "&.Mui-selected": {
                    border: "1px solid #004c99",
                  },
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
              backgroundColor:
                cookietheme["theme-preference"] === "dark"
                  ? "#b1bed3"
                  : "#ecf6ff",
              border: "1px solid #b1bed3",
              borderRadius: "5px",
              color: "black",
              resize: "none",
              outline: "none",
            }}
            ref={textRef}
          />
          <Button
            sx={{
              border: "1px solid #313741",
              color: "primary.btnTxt",
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

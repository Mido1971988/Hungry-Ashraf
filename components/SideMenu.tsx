import { Menu, MenuItem, useMediaQuery } from "@mui/material";
import { GrSystem } from "react-icons/gr";
import { MdOutlineDarkMode, MdOutlineWbSunny } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { Dispatch, SetStateAction } from "react";

export default function SideMenu({
  anchorEl,
  open,
  setAnchorEl,
  setBurgerOpen,
}: {
  anchorEl: null | HTMLElement;
  open: boolean;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  setBurgerOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  let systemTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const [cookieValue, setCookieTheme] = useCookies(["theme-preference"]);
  const [systemCookie, setSystemCookie] = useCookies(["system-theme"]);

  return (
    <Menu
      id="theme"
      anchorEl={anchorEl}
      open={open}
      onClose={() => {
        setAnchorEl(null);
        setBurgerOpen(false);
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
          setBurgerOpen(false);
          router.refresh();
        }}
        key="dark-theme"
        sx={{ width: "110px" }}
      >
        <MdOutlineDarkMode />
        <span style={{ marginLeft: "10px" }}>Dark</span>
      </MenuItem>
      <MenuItem
        onClick={() => {
          setCookieTheme("theme-preference", "light");
          setSystemCookie("system-theme", "no");
          setAnchorEl(null);
          setBurgerOpen(false);
          router.refresh();
        }}
        key="light-theme"
        sx={{ width: "110px" }}
      >
        <MdOutlineWbSunny /> <span style={{ marginLeft: "10px" }}>Light</span>
      </MenuItem>
      <MenuItem
        onClick={() => {
          setSystemCookie("system-theme", "yes");
          setCookieTheme("theme-preference", systemTheme ? "dark" : "light");
          setAnchorEl(null);
          setBurgerOpen(false);
          router.refresh();
        }}
        key="system-theme"
        sx={{ width: "110px" }}
      >
        <GrSystem /> <span style={{ marginLeft: "10px" }}>System</span>
      </MenuItem>
    </Menu>
  );
}

import React from "react";
import { Menu, MenuItem } from "@mui/material";

export default function NavMenu({
  id,
  anchorEl,
  open,
  onClose,
  foodList,
}: {
  id: string;
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  foodList: string[];
}) {
  return (
    <Menu
      id={id}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      MenuListProps={{ "aria-labelledby": "breakfast" }}
    >
      {foodList.map((food) => (
        <MenuItem
          onClick={onClose}
          key={food}
          sx={{ width: "100px", justifyContent: "center" }}
        >
          {food}
        </MenuItem>
      ))}
    </Menu>
  );
}

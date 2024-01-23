import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";

export default function Navbar() {
  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <FastfoodIcon />
          </IconButton>
          <Typography>Hungry Ashraf</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

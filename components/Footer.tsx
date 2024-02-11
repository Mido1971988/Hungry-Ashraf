import { Box, Paper, Typography } from "@mui/material";
import { ImPacman } from "react-icons/im";

export default function Footer() {
  const date = new Date();
  return (
    <Paper
      sx={{
        width: "100%",
        height: "50px",
        position: "fixed",
        bottom: 0,
        left: 0,
        padding: "24px",
        backgroundColor: "primary.footer",
        color: "#eee",
        borderRadius: "0",
      }}
      component="footer"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography sx={{ fontFamily: "revert-layer" }}>
          Copyright <ImPacman /> {date.getFullYear()}
        </Typography>
      </Box>
    </Paper>
  );
}

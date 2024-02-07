import { Button, Drawer, Stack, Typography } from "@mui/material";
import Image from "next/image";
import coffe from "../myData/imgs/Ashraf/Coffe.jpg";
import insta from "../myData/imgs/instagram.png";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";

export default function LeftDrawer({
  openDrawer,
  setOpenDrawer,
}: {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Drawer
      anchor="left"
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
    >
      <Stack
        direction="column"
        margin={"30px"}
        width={"200px"}
        justifyContent={"space-between"}
        height={"100%"}
      >
        <Stack gap={"30px"}>
          <Button
            color="inherit"
            id="random-meal"
            aria-controls={openDrawer ? "breakfast" : undefined}
            aria-expanded={openDrawer ? "true" : undefined}
            aria-haspopup="true"
            sx={{
              textTransform: "uppercase",
              fontFamily: "revert-layer",
              fontWeight: "bold",
            }}
            onClick={() => setOpenDrawer(false)}
          >
            <Image
              src={coffe}
              alt="coffe"
              width={100}
              height={100}
              style={{ borderRadius: "100px" }}
            ></Image>
          </Button>
          <Typography fontWeight={"bold"} textAlign={"center"}>
            إنسان بوهيمي يأكل ما يحلو له
          </Typography>
          <Button
            color="inherit"
            id="face"
            aria-controls={openDrawer ? "dinner" : undefined}
            aria-expanded={openDrawer ? "true" : undefined}
            aria-haspopup="true"
            onClick={() => setOpenDrawer(false)}
            sx={{
              textTransform: "uppercase",
              fontFamily: "revert-layer",
              fontWeight: "bold",
            }}
          >
            <FaFacebook size={40} color="#316FF6" />
            <Typography
              marginLeft={"10px"}
              fontFamily={"revert-layer"}
              fontWeight={"bold"}
            >
              Facebook
            </Typography>
          </Button>

          <Button
            color="inherit"
            id="insta"
            onClick={() => setOpenDrawer(false)}
            sx={{
              textTransform: "uppercase",
              fontFamily: "revert-layer",
              fontWeight: "bold",
            }}
          >
            <Image
              src={insta}
              alt="coffe"
              width={40}
              height={40}
              style={{ borderRadius: "40px" }}
            ></Image>
            <Typography
              marginLeft={"10px"}
              fontFamily={"revert-layer"}
              fontWeight={"bold"}
            >
              Instagram
            </Typography>
          </Button>
        </Stack>
        <Button
          color="inherit"
          id="signOut"
          onClick={() => setOpenDrawer(false)}
          sx={{
            textTransform: "uppercase",
            fontFamily: "revert-layer",
            fontWeight: "bold",
          }}
        >
          sign out
        </Button>
      </Stack>
    </Drawer>
  );
}

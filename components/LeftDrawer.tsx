import { Button, Drawer, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Ashraf from "../myData/imgs/ProfilePics/Ashraf.jpg";
import Abood from "../myData/imgs/ProfilePics/Abood.jpg";
import Maher from "../myData/imgs/ProfilePics/Maher.jpg";
import Yaser from "../myData/imgs/ProfilePics/Yaser.jpg";
import Shekmo from "../myData/imgs/ProfilePics/Shekmo.jpg";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";
import { Container } from "@mui/system";
import { FoodList, foodList } from "@/myData/foodList";
import { toast } from "react-toastify";
import { Session } from "next-auth";

export default function LeftDrawer({
  openDrawer,
  setOpenDrawer,
  session,
  setOpenDialog,
}: {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  session: Session | null;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const numOfFood = foodList[session?.user?.name as keyof FoodList]
    ? foodList[session?.user?.name as keyof FoodList].length
    : 0;

  const profileObj =
    session?.user?.name === "Ashraf"
      ? {
          pic: Ashraf,
          pName: "Ashraf Al Hadidy",
          pDate: "1/9/1986",
          Pdescription:
            " إنسان بوهيمي يأكل ما يحلو له والي ما لا يحلو له كمان مفيش مشكلة",
          facebook: "https://www.facebook.com/eshesh.ahlawy",
          instagram: "https://www.instagram.com/ashraf_elhadidy/",
        }
      : session?.user?.name === "Shekmo"
      ? {
          pic: Shekmo,
          pName: "Mohamed Soliman",
          pDate: "19/7/1988",
          Pdescription:
            "يأكل ثلالث وجبات في اليوم في اوقات مقدسة ومن الممكن اضافة ثمرة علي المغربية",
          facebook: "https://www.facebook.com/mohammed.soliman.1088/",
          instagram: "https://www.instagram.com/mohammedsoliman88/",
        }
      : session?.user?.name === "Yaser"
      ? {
          pic: Yaser,
          pName: "Mohamed Yaser",
          pDate: "31/7/1988",
          Pdescription:
            "ملك الفراولة وبيحاول يخلي بنته تحب الفراولة زيه وبيحاول يقنعنا انها بتحب الفراولة زيه واحنا عاملين نفسنا مصدقين",
          facebook: "https://www.facebook.com/mohammed.yasser1",
          instagram: "https://www.instagram.com/el_samny/",
        }
      : session?.user?.name === "Abood"
      ? {
          pic: Abood,
          pName: "Abdullah Abu Saada",
          pDate: "5/1/1988",
          Pdescription:
            "شاب ثلاثيني يتغــذي علي الحمام المحشي والفوارغ ... ولو محتاج قرض يبقي وصلت للشخص المناسب",
          facebook: "https://www.facebook.com/Abdulla.Mohammed.AbuSaada",
          instagram: "https://www.instagram.com/abdullahabusaada/",
        }
      : session?.user?.name === "Maher"
      ? {
          pic: Maher,
          pName: "Mohamed Maher",
          pDate: "4/9/1988",
          Pdescription:
            "مودي مودي ملك قفشات الافلام واكل الانستقرام ... ماشاء الله مامته طباخة ماهرة",
          facebook: "https://www.facebook.com/mohammed.Maher.m",
          instagram: "https://www.instagram.com/moh_maher/",
        }
      : {
          pic: Ashraf,
          pName: "Ashraf Al Hadidy",
          pDate: "1/9/1986",
          Pdescription: "",
          facebook: "https://www.facebook.com/eshesh.ahlawy",
          instagram: "https://www.instagram.com/ashraf_elhadidy/",
        };

  return (
    <Drawer
      anchor="left"
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
    >
      <Stack
        width={"220px"}
        height={"100%"}
        bgcolor={"#0f1418"}
        sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <Container
          sx={{
            width: "220px",
            height: "220px",
            margin: "0",
            padding: { xs: "10px" },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src={profileObj.pic}
            alt="coffe"
            style={{ width: "100%", height: "100%" }}
          ></Image>
        </Container>
        <Typography
          fontWeight={"bold"}
          textAlign={"center"}
          sx={{ color: "#6c7a90", fontFamily: "IBM Plex Sans" }}
        >
          {profileObj.pName} <IoCheckmarkCircle color="#7ac141" />
        </Typography>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "#6c7a90",
            borderBottom: "1px solid #6c7a90",
          }}
        >
          <Typography sx={{ fontFamily: "IBM Plex Sans" }}>
            {" "}
            {numOfFood} Photos
          </Typography>
          <Typography sx={{ fontFamily: "IBM Plex Sans" }}>0 Videos</Typography>
        </Container>
        <Typography
          textAlign={"center"}
          sx={{
            color: "#c8c8c8",
            fontFamily: "IBM Plex Sans",
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "5px",
          }}
        >
          <span>Birthday : {profileObj.pDate}</span>
          <br />
          <span>{profileObj.Pdescription}</span>
        </Typography>

        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "20px",
            height: "70px",
            width: "100%",
            marginTop: "auto",
          }}
        >
          <a target="_blank" href={profileObj.facebook}>
            <FaFacebook size={30} color="#6c7a90" />
          </a>
          <FaSquareTwitter
            size={30}
            color="#6c7a90"
            onClick={() => toast.error("معندوش تويتر")}
          />
          <a href={profileObj.instagram} target="_blank">
            <FaInstagramSquare size={30} color="#6c7a90" />
          </a>
        </Stack>
      </Stack>
      <Button
        color="inherit"
        id="signOut"
        onClick={() => {
          setOpenDrawer(false);
          setOpenDialog(true);
        }}
        sx={{
          textTransform: "uppercase",
          fontFamily: "revert-layer",
          fontWeight: "bold",
          color: "#c8c8c8",
          backgroundColor: "#6c7a90",
        }}
      >
        sign out
      </Button>
    </Drawer>
  );
}

import { Button, Drawer, Link, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Ashraf from "../myData/imgs/ProfilePics/Ashraf.jpg";
import Abood from "../myData/imgs/ProfilePics/Abood.jpg";
import Maher from "../myData/imgs/ProfilePics/Maher.jpg";
import Yaser from "../myData/imgs/ProfilePics/Yasser.jpg";
import Soliman from "../myData/imgs/ProfilePics/Soliman.jpg";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";
import { Container } from "@mui/system";
import { FoodList, foodList } from "../myData/foodList";
import { toast } from "react-toastify";
import { Session } from "next-auth";

export default function LeftDrawer({
  openLeftDrawer,
  setOpenLeftDrawer,
  session,
  setOpenDialog,
}: {
  openLeftDrawer: boolean;
  setOpenLeftDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  session: Session | null;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // to get  number of food images
  const numOfFood = foodList[session?.user?.name as keyof FoodList]
    ? foodList[session?.user?.name as keyof FoodList].length
    : 0;

  // user object to use it on Profile  page
  const profileObj =
    session?.user?.name === "Ashraf"
      ? {
          pic: Ashraf,
          pName: "Ashraf Al Hadidy",
          pDate: "1/9/1985",
          Pdescription:
            " إنسان بوهيمي يأكل ما يحلو له والي ما لا يحلو له كمان مفيش مشكلة",
          facebook: "https://www.facebook.com/eshesh.ahlawy",
          instagram: "https://www.instagram.com/ashraf_elhadidy/",
        }
      : session?.user?.name === "Soliman"
      ? {
          pic: Soliman,
          pName: "Mohamed Soliman",
          pDate: "19/7/1988",
          Pdescription:
            "يأكل ثلاث وجبات في اليوم في اوقات مقدسة ومن الممكن اضافة ثمرة علي المغربية",
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
          pDate: "1/9/1985",
          Pdescription:
            " إنسان بوهيمي يأكل ما يحلو له والي ما لا يحلو له كمان مفيش مشكلة",
          facebook: "https://www.facebook.com/eshesh.ahlawy",
          instagram: "https://www.instagram.com/ashraf_elhadidy/",
        };

  return (
    <Drawer
      anchor="left"
      open={openLeftDrawer}
      onClose={() => setOpenLeftDrawer(false)}
    >
      <Stack
        width={"220px"}
        height={"100%"}
        bgcolor={"#0f1418"}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          backgroundColor: "background.default",
        }}
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
            priority={true}
          ></Image>
        </Container>
        <Typography
          fontWeight={"bold"}
          textAlign={"center"}
          sx={{ color: "primary.main", fontFamily: "IBM Plex Sans" }}
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
          <Typography
            sx={{ fontFamily: "IBM Plex Sans", color: "primary.btnTxt" }}
          >
            {" "}
            {numOfFood} Photos
          </Typography>
          <Typography
            sx={{ fontFamily: "IBM Plex Sans", color: "primary.btnTxt" }}
          >
            0 Videos
          </Typography>
        </Container>
        <Typography
          textAlign={"center"}
          sx={{
            color: "primary.btnTxt",
            fontFamily: "IBM Plex Sans",
            fontWeight: "1200",
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
            marginBottom: "30px",
          }}
        >
          <Link
            target="_blank"
            href={profileObj.facebook}
            style={{ color: "primary.main" }}
          >
            <FaFacebook size={40} />
          </Link>
          <Link style={{ color: "primary.main" }}>
            <FaSquareTwitter
              size={40}
              onClick={() => toast.error("معندوش تويتر")}
            />
          </Link>
          <Link
            href={profileObj.instagram}
            target="_blank"
            style={{ color: "primary.main" }}
          >
            <FaInstagramSquare size={40} />
          </Link>
        </Stack>
      </Stack>
      <Button
        color="inherit"
        id="signOut"
        onClick={() => {
          setOpenLeftDrawer(false);
          setOpenDialog(true);
        }}
        sx={{
          textTransform: "uppercase",
          fontFamily: "revert-layer",
          fontWeight: "bold",
          color: "white",
          backgroundColor: "primary.main",
          borderRadius: "0px",
          "&:hover": {
            backgroundColor: "primary.main",
          },
        }}
        style={{ height: "50px" }}
      >
        sign out
      </Button>
    </Drawer>
  );
}

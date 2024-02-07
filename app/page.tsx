import Navbar from "@/components/NavBar";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { GiStrawberry, GiShinyApple, GiHamburger } from "react-icons/gi";
import { CiPizza } from "react-icons/ci";
import { LuBird } from "react-icons/lu";
import { MdFastfood } from "react-icons/md";
import { GiDinosaurRex } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { cookies } from "next/headers";
import Footer from "@/components/Footer";
import Container from "@mui/material/Container";
import CarouselComp from "@/components/CarouselComp";
import { Typography } from "@mui/material";
import Loading from "@/components/Loading";

export default async function Home() {
  const session = await getServerSession(options);

  let DynamicIcon = MdFastfood;
  let ToastIcon = MdFastfood;
  let ToastTxt = "";
  let ToastColor = "";

  switch (session?.user?.name) {
    case "Ashraf":
      DynamicIcon = CiPizza;
      ToastIcon = GiDinosaurRex;
      ToastTxt = "الديناصور وصل يا معلمة";
      ToastColor = "green";
      break;
    case "Shekmo":
      DynamicIcon = GiShinyApple;
      ToastIcon = GiShinyApple;
      ToastTxt = "اوعي تنسي معاد الثمرة";
      ToastColor = "green";
      break;
    case "Abood":
      DynamicIcon = LuBird;
      ToastIcon = LuBird;
      ToastTxt = "فوارغ هنا بسرعة";
      ToastColor = "blue";
      break;
    case "Yaser":
      DynamicIcon = GiStrawberry;
      ToastIcon = GiStrawberry;
      ToastTxt = "كيلو فراولة هنا بسرعة";
      ToastColor = "red";
      break;
    case "Maher":
      DynamicIcon = GiHamburger;
      ToastIcon = FaHeart;
      ToastTxt = "منور يا مودي مودي";
      ToastColor = "red";
      break;
    case undefined:
      DynamicIcon = MdFastfood;
      break;
  }
  return (
    <div style={{ minHeight: "100svh" }}>
      <Navbar
        session={session}
        cookieTheme={cookies().get("theme-preference")?.value || "dark"}
      >
        <DynamicIcon />
        <ToastIcon id={ToastTxt} color={ToastColor} />
      </Navbar>
      {session ? (
        <CarouselComp />
      ) : (
        <div
          style={{
            height: "calc(100svh - 114px)",
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "40px",
            top: "64px",
            position: "relative",
            backgroundColor: "#0f1418",
            fontFamily: "IBM Plex Sans",
            fontWeight: "bold",
            color: "#6c7a90",
          }}
        >
          <h1>Sign in to Show Your Meal....</h1>
          {/* <Loading /> */}
        </div>
      )}
      <Footer />
    </div>
  );
}

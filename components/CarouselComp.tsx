import Image, { StaticImageData } from "next/image";
import Carousel from "./Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import coffe from "../myData/imgs/Ashraf/Coffe.jpg";
import coffe2 from "../myData/imgs/Ashraf/Coffe2.jpg";
import coffe3 from "../myData/imgs/Ashraf/Coffe3.jpg";
import batayez from "../myData/imgs/Ashraf/Batayez.jpg";
import batayez2 from "../myData/imgs/Ashraf/Batayez2.jpg";
import brain from "../myData/imgs/Ashraf/Brain.jpg";
import feteer from "../myData/imgs/Ashraf/Feteer.jpg";
import kaware3 from "../myData/imgs/Ashraf/Kaware3.jpg";
import kebda from "../myData/imgs/Ashraf/Kebda.jpg";
import konafa from "../myData/imgs/Ashraf/Konafa.jpg";
import koshary from "../myData/imgs/Ashraf/Koshary.jpg";
import rosBeLaban from "../myData/imgs/Ashraf/RosBeLaban.jpg";
import wara2Enab from "../myData/imgs/Ashraf/Wara2Enab.jpg";
import wara2Enab2 from "../myData/imgs/Ashraf/Wara2Enab2.jpg";
import wara2Enab3 from "../myData/imgs/Ashraf/Wara2Enab3.jpg";
import wara2Enab4 from "../myData/imgs/Ashraf/Wara2Enab4.jpg";
import fawaregh from "../myData/imgs/Abood/Fawaregh.jpg";
import hamam from "../myData/imgs/Abood/Hamam.jpg";
import egg from "../myData/imgs/Shekmo/Egg.jpg";
import salmon from "../myData/imgs/Shekmo/Salmon.jpg";
import strawberry from "../myData/imgs/Yaser/Strawberry.jpg";
import fish from "../myData/imgs/Yaser/Fish.jpg";
import shawerma from "../myData/imgs/Yaser/Shawerma.jpg";
import burger from "../myData/imgs/Maher/Burger.jpg";
import chicks from "../myData/imgs/Maher/Chicks.jpg";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function CarouselComp() {
  const session = await getServerSession(options);
  const logogedUser: string = session?.user?.name
    ? session?.user?.name
    : "No-User";

  interface FoodList {
    Ashraf: StaticImageData[];
    Shekmo: StaticImageData[];
    Abood: StaticImageData[];
    Yaser: StaticImageData[];
    Maher: StaticImageData[];
  }

  const foodList: FoodList = {
    Ashraf: [
      coffe,
      coffe2,
      coffe3,
      batayez,
      batayez2,
      brain,
      feteer,
      kaware3,
      kebda,
      konafa,
      koshary,
      rosBeLaban,
      wara2Enab,
      wara2Enab2,
      wara2Enab3,
      wara2Enab4,
    ],
    Shekmo: [egg, salmon],
    Abood: [fawaregh, hamam],
    Yaser: [strawberry, fish, shawerma],
    Maher: [burger, chicks],
  };

  return (
    <Container
      sx={{
        height: "calc(100svh - 114px)",
        position: "relative",
        top: "64px",
      }}
      component={"section"}
    >
      <Carousel
        autoPlay={false}
        interval={3000}
        infiniteLoop={true}
        showThumbs={false}
      >
        {foodList[logogedUser as keyof FoodList].map((food) => (
          <div style={{ width: "100%", height: "100%" }} key={Date.now()}>
            <Image
              src={food}
              alt="1"
              style={{ width: "100%", height: "100%" }}
              priority
            />
            <Typography className="legend" key={Date.now()}>
              Coffe in the Office
            </Typography>
          </div>
        ))}
      </Carousel>
    </Container>
  );
}

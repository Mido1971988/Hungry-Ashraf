import Image from "next/image";
import Carousel from "./Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { options } from "../app/api/auth/[...nextauth]/options";
import { cookies } from "next/headers";
import { foodList } from "../myData/foodList";
import type { FoodList } from "../myData/foodList";
import Loading from "./Loading";

export default async function CarouselComp() {
  // to get auth session on server
  const session = await getServerSession(options);
  // to extract logged Username
  const logogedUser: string = session?.user?.name
    ? session?.user?.name
    : "No-User";
  // regex to extract food name from file name
  const regx = /(?<=media\/).*?(?=\.)/gm;
  const randomFood =
    foodList[logogedUser as keyof FoodList][
      cookies().get("random-meal-num")?.value
        ? Number(cookies().get("random-meal-num")?.value)
        : 0
    ];
  const randomFoodName = (foodList[logogedUser as keyof FoodList][
    cookies().get("random-meal-num")?.value
      ? Number(cookies().get("random-meal-num")?.value) <
        foodList[logogedUser as keyof FoodList].length
        ? Number(cookies().get("random-meal-num")?.value)
        : 0
      : 0
  ].src.match(regx) || ["no-match"])[0];

  return (
    <Container
      sx={{
        height: "calc(100svh - 114px)",
        position: "relative",
        top: "64px",
      }}
      component={"section"}
    >
      {cookies().get("random-meal-button")?.value === "true" ? (
        cookies().get("random-loading")?.value === "true" ? (
          <Container
            style={{
              height: "calc(100svh - 114px)",
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "40px",
            }}
            sx={{ fontSize: { xs: "12px", sm: "16px" } }}
          >
            <h1>Searhing for Best Meal for You....</h1>
            <Loading />
          </Container>
        ) : (
          <Image
            src={randomFood}
            alt={randomFoodName}
            style={{ width: "100%", height: "100%" }}
            priority
          ></Image>
        )
      ) : (
        <Carousel
          autoPlay={false}
          interval={3000}
          infiniteLoop={true}
          showThumbs={false}
        >
          {foodList[logogedUser as keyof FoodList].map((food) => {
            const foodName = food.src.match(regx) || ["no-match"];
            return (
              <div style={{ width: "100%", height: "100%" }} key={food.src}>
                <Image
                  src={food}
                  alt={foodName[0]}
                  style={{ width: "100%", height: "100%" }}
                  priority
                />
                <Typography
                  className="legend"
                  key={foodName[0]}
                  style={{ backgroundColor: "#1566c182", fontWeight: "bold" }}
                >
                  {foodName[0]}
                </Typography>
              </div>
            );
          })}
        </Carousel>
      )}
    </Container>
  );
}

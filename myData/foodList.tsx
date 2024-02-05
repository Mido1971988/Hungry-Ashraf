import coffe from "./imgs/Ashraf/Coffe.jpg";
import coffe2 from "./imgs/Ashraf/Coffe2.jpg";
import coffe3 from "./imgs/Ashraf/Coffe3.jpg";
import batayez from "./imgs/Ashraf/Batayez.jpg";
import batayez2 from "./imgs/Ashraf/Batayez2.jpg";
import brain from "./imgs/Ashraf/Brain.jpg";
import feteer from "./imgs/Ashraf/Feteer.jpg";
import kaware3 from "./imgs/Ashraf/Kaware3.jpg";
import kebda from "./imgs/Ashraf/Kebda.jpg";
import konafa from "./imgs/Ashraf/Konafa.jpg";
import koshary from "./imgs/Ashraf/Koshary.jpg";
import rosBeLaban from "./imgs/Ashraf/RosBeLaban.jpg";
import wara2Enab from "./imgs/Ashraf/Wara2Enab.jpg";
import wara2Enab2 from "./imgs/Ashraf/Wara2Enab2.jpg";
import wara2Enab3 from "./imgs/Ashraf/Wara2Enab3.jpg";
import wara2Enab4 from "./imgs/Ashraf/Wara2Enab4.jpg";
import fawaregh from "./imgs/Abood/Fawaregh.jpg";
import hamam from "./imgs/Abood/Hamam.jpg";
import egg from "./imgs/Shekmo/Egg.jpg";
import salmon from "./imgs/Shekmo/Salmon.jpg";
import strawberry from "./imgs/Yaser/Strawberry.jpg";
import fish from "./imgs/Yaser/Fish.jpg";
import shawerma from "./imgs/Yaser/Shawerma.jpg";
import burger from "./imgs/Maher/Burger.jpg";
import chicks from "./imgs/Maher/Chicks.jpg";
import { StaticImageData } from "next/image";

export interface FoodList {
  Ashraf: StaticImageData[];
  Shekmo: StaticImageData[];
  Abood: StaticImageData[];
  Yaser: StaticImageData[];
  Maher: StaticImageData[];
}

export const foodList: FoodList = {
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

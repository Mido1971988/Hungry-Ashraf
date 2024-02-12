import coffe from "./imgs/Ashraf/Coffe.jpg";
import coffe2 from "./imgs/Ashraf/Coffe2.jpg";
import batayez from "./imgs/Ashraf/Batayez.jpg";
import batayez2 from "./imgs/Ashraf/Batayez2.jpg";
import batayez3 from "./imgs/Ashraf/Batayez3.jpg";
import batayez4 from "./imgs/Ashraf/Batayez4.jpg";
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
import fawaregh from "./imgs/Abood/Fawaregh.jpg";
import hamam from "./imgs/Abood/Hamam.jpg";
import waara2Enab from "./imgs/Abood/Waara2Enab.jpg";
import egg from "./imgs/Soliman/Egg.jpg";
import salmon from "./imgs/Soliman/Salmon.jpg";
import Pizza from "./imgs/Soliman/Pizza.jpg";
import strawberry from "./imgs/Yaser/Strawberry.jpg";
import chicken from "./imgs/Yaser/Chicken.jpg";
import shawerma from "./imgs/Yaser/Shawerma.jpg";
import burger from "./imgs/Maher/Burger.jpg";
import chicks from "./imgs/Maher/Chicks.jpg";
import { StaticImageData } from "next/image";

export interface FoodList {
  Ashraf: StaticImageData[];
  Soliman: StaticImageData[];
  Abood: StaticImageData[];
  Yaser: StaticImageData[];
  Maher: StaticImageData[];
}

export const foodList: FoodList = {
  Ashraf: [
    koshary,
    coffe,
    batayez,
    rosBeLaban,
    batayez4,
    brain,
    feteer,
    kaware3,
    kebda,
    batayez2,
    konafa,
    wara2Enab,
    coffe2,
    wara2Enab2,
    batayez3,
    wara2Enab3,
  ],
  Soliman: [egg, salmon, Pizza],
  Abood: [fawaregh, hamam, waara2Enab],
  Yaser: [strawberry, chicken, shawerma],
  Maher: [burger, chicks, Pizza],
};

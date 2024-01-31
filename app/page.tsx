import Navbar from "@/components/NavBar";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { GiStrawberry, GiShinyApple, GiHamburger } from "react-icons/gi";
import { CiPizza } from "react-icons/ci";
import { LuBird } from "react-icons/lu";
import { MdFastfood } from "react-icons/md";

export default async function Home() {
  const session = await getServerSession(options);

  let DynamicIcon = MdFastfood;
  switch (session?.user?.name) {
    case "Ashraf":
      DynamicIcon = CiPizza;
      break;
    case "Shekmo":
      DynamicIcon = GiShinyApple;
      break;
    case "Abood":
      DynamicIcon = LuBird;
      break;
    case "Yaser":
      DynamicIcon = GiStrawberry;
      break;
    case "Maher":
      DynamicIcon = GiHamburger;
      break;
    case "Admin":
      DynamicIcon = MdFastfood;
      break;
    case undefined:
      DynamicIcon = MdFastfood;
      break;
  }

  return (
    <>
      <Navbar session={session}>
        <DynamicIcon />
      </Navbar>
    </>
  );
}

import Navbar from "@/components/NavBar";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(options);
  return (
    <>
      <Navbar session={session} />
    </>
  );
}

import { NextResponse } from "next/server";
import listOfUsers from "../../../myData/listOfUsers.json";

export async function GET(request: Request) {
  return NextResponse.json(listOfUsers, { status: 200 });
}

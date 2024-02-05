"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function changeCookie(randomMealValue: string) {
  "use server";
  cookies().set("random-meal-button", randomMealValue);
  revalidatePath("/");
}

export async function changeNumCookie(randomNumValue: string) {
  "use server";
  cookies().set("random-meal-num", randomNumValue);
  revalidatePath("/");
}

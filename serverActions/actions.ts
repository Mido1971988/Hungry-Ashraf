"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function changeCookie(randomMealValue: string) {
  cookies().set("random-meal-button", randomMealValue);
  revalidatePath("/");
}

export async function changeNumCookie(randomNumValue: string) {
  cookies().set("random-meal-num", randomNumValue);
  revalidatePath("/");
}

export async function loading(loadValue: string) {
  cookies().set("random-loading", loadValue);
  revalidatePath("/");
}

"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// change theme-preference cookie
export async function changeThemeCookie(themeCookie: string) {
  cookies().set("theme-preference", themeCookie);
  revalidatePath("/");
}
// change system-theme cookie to know set theme as device mode or as selected mode from right Drawer
export async function systemThemeCookie(systemThemeCookie: string) {
  cookies().set("system-theme", systemThemeCookie);
  revalidatePath("/");
}
// change Random Cookie Object to handle Random meal button
export async function changeRandomCookie(randomMealValue: string) {
  cookies().set("random-meal-obj", randomMealValue);
  revalidatePath("/");
}

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
// change random-meal-button cookie so to decidie to render Carousel or Loading page then Random Image from CarouselComp ( Server Component)
export async function changeRandomCookie(randomMealValue: string) {
  cookies().set("random-meal-button", randomMealValue);
  revalidatePath("/");
}
// to change random-meal-num so you can get this cookie from CarouselComp ( Server Component)
export async function changeNumCookie(randomNumValue: string) {
  cookies().set("random-meal-num", randomNumValue);
  revalidatePath("/");
}
// to change random-loading so you can get this cookie from CarouselComp ( Server Component)
// to decidie to render Carousel or Loading page then Random Image
export async function loading(loadValue: string) {
  cookies().set("random-loading", loadValue);
  revalidatePath("/");
}

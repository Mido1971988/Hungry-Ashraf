import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";
import { cookies } from "next/headers";
import { CssBaseline } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hungry Ashraf",
  description: "Hungry Ashraf",
};

// to disable zoom on mobile when user start typing in textfield
export const viewport: Viewport = {
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers
          cookieTheme={cookies().get("theme-preference")?.value || "dark"}
        >
          <CssBaseline />
          {children}
        </Providers>
      </body>
    </html>
  );
}

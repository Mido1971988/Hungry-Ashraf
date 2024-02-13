"use client";
import { useMediaQuery } from "@mui/material";
import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Loading() {
  // to get Theme so can change color of Loading Component depend on theme
  const isDark = useMediaQuery("(prefers-color-scheme: dark");
  return (
    <PacmanLoader
      color={isDark ? "#1566c1" : "#0c47a1"}
      loading={true}
      size={50}
    />
  );
}

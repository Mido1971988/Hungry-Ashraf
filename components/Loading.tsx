"use client";
import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Loading() {
  return <PacmanLoader color="#42a5f5" loading={true} size={50} />;
}

"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import CommunityPostForm from "./community_create";

export default function CommunityCreateWrapper() {
  const params = useSearchParams(); // safe here inside a client component
  const ref = params.get("ref");

  return <CommunityPostForm />;
}

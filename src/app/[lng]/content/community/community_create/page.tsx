"use client";
import React, { Suspense } from "react";
import BaseLayout from "@/layouts/base-layout";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Load Submenu and Post Form dynamically to support SSR/client-safe usage
const Submenu = dynamic(() => import("@/components/header/submenu"));
const CommunityPostForm = dynamic(() => import("@/app/[lng]/content/community/community_create/components/community_create"),);

export default function CommunityPage() {
  return (
    <BaseLayout>
      <Suspense fallback={<></>}>
        <Submenu />
        <main>
          <CommunityPostForm />
        </main>
      </Suspense>
    </BaseLayout>
  );
}

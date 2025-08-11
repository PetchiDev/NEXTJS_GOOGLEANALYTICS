import NotFound from "@/components/not-found";
import BaseLayout from "@/layouts/base-layout";
import dynamic from "next/dynamic";
const Submenu = dynamic(
  () => import("@/components/header/submenu")
);

function page() {
  return (
    <BaseLayout>
      <Submenu />
      <NotFound />
    </BaseLayout>
  );
}

export default page;

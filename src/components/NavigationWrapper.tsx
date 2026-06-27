"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import LeftSidebar from "@/components/leftsidebar";
import RightSidebar from "@/components/rightsidebar";

export default function NavigationWrapper() {
  const pathname = usePathname();
  const isRoot = pathname === "/";

  if (!isRoot) {
    return null;
  }

  return (
    <>
      <Header />
      <LeftSidebar />
      <RightSidebar />
    </>
  );
}

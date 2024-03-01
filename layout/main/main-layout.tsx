"use client";

import Navbar from "./navbar";
import SettingDraw from "@/components/setting-draw";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SettingDraw />

      <Navbar />

      <div className="mx-[var(--header-size)]">
        <main>{children}</main>
      </div>
    </>
  );
}

export default MainLayout;

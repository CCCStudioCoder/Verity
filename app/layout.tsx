import type { Metadata } from "next";
import "./globals.css";
import "./mobile.css";
import Link from "next/link";
import SideMenu from "./components/nav";

import DashBoard from "@/public/dashboard.svg";
import Exercises from "@/public/exercices.svg";
import Profile from "@/public/profil.svg";

export const metadata: Metadata = {
  title: "Verity",
  description: "Apprendre en s'amusant",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const sideMenuVisible = <SideMenu /> != null;
  return (
    <html
      lang="en"
    >
      <body className="h-screen overflow-hidden flex flex-col">
        <nav className="relative h-16 flex items-center bg-menus p-3">
          <li className="list-none text-4xl"><Link href={"/"}>VERITY</Link></li>
          <ul className="ml-auto flex list-none items-center gap-8 text-xl mr-4">
            <li className="upper-link"><Link href={"/dashboard"} aria-label="Dashboard"><DashBoard /></Link></li>
            <li className="upper-link"><Link href={"/exercices"} aria-label="Exercises"><Exercises /></Link></li>
            <li className="upper-link"><a href="#" aria-label="Profile"><Profile /></a></li>
          </ul>
        </nav>
        <div className="grid grid-cols-5 h-[calc(100vh-4rem)]">
          {sideMenuVisible && (
            <aside className="col-span-1 overflow-x-auto p-0">
              <SideMenu/>
            </aside>
          )}
          <main className={`min-h-0 overflow-y-auto pl-24 pr-23 mr-1 py-12 relative ${sideMenuVisible ? "col-span-4" : "col-span-5"}`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

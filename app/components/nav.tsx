'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import Overview from "@/public/dashboard.svg";
import Agenda from "@/public/agenda.svg";
import Courses from "@/public/courses.svg";
import Test from "@/public/test.svg";
import Content from "@/public/content.svg";
import Stats from "@/public/stats.svg";
import Parameters from "@/public/parameters.svg";
import Class from "@/public/class.svg";
import Docs from "@/public/docs.svg";

type SubPathArgs = {
  subpath: string;
};

const dashboardItems = [
  { href: "/dashboard", label: "Overview", Icon: Overview },
  { href: "/dashboard/agenda", label: "Agenda", Icon: Agenda },
  { href: "/dashboard/courses", label: "Courses", Icon: Courses },
  { href: "/dashboard/test", label: "Test", Icon: Test },
  { href: "/dashboard/content", label: "Content", Icon: Content },
  { href: "/dashboard/stats", label: "Stats", Icon: Stats },
] as const;

function DashBoardMenu({ subpath }: SubPathArgs) {
  return (
    <ul className="flex flex-col gap-2">
        {dashboardItems.map(({ href, label, Icon }) => {
          const isActive =
            (href === "/dashboard" && subpath === "") ||
            subpath === href.replace("/dashboard/", "");

          return (
            <li key={href} className={"side-link" + (isActive ? " active" : "")}>
              <Link
                href={href}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 transition-colors duration-200"
              >
                <Icon className="h-5 w-5 shrink-0 stroke-current" />
                <span className="text-xl font-medium tracking-wide">{label}</span>
              </Link>
            </li>
          );
        })}

        <li className="mt-2 border-t border-foreground/15 pt-4">
          <div className="flex flex-col gap-2">
            <Link href="/settings" className="bottom-button">
              <Parameters className="h-5 w-5 shrink-0" />
              <span>Paramètres</span>
            </Link>
            <Link href="/class" className="bottom-button">
              <Class className="h-5 w-5 shrink-0" />
              <span>Classe</span>
            </Link>
          </div>
        </li>
        <Link
          href="/docs"
          className="doc-button"
          aria-label="Docs"
        >
          <Docs className="h-6 w-6" />
        </Link>
    </ul>
  );
}

const sideMenus: Record<string, (subpath: string) => React.ReactNode> = {
  dashboard: (subpath) => <DashBoardMenu subpath={subpath} />,
};

export default function SideMenu() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const section = segments[0] ?? "";
  const subpath = segments[1] ?? "";

  return sideMenus[section] ? (
    <div className="relative flex h-full flex-col gap-3 bg-menus/50 p-4 z-10">
      {(sideMenus[section](section === "dashboard" ? subpath : "")) || <></>}
    </div>
  ) : null;
}
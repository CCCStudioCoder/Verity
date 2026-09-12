import { ViewTransition } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return <ViewTransition name="page">{children}</ViewTransition>;
}

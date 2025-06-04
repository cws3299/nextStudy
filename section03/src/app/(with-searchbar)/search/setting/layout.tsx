import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <>중첩 레이아웃 {children}</>;
}

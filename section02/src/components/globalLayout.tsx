import { ReactNode } from "react";
import Link from "next/link";
import style from "./globalLayout.module.css";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href={"/"}>📖 books</Link>
      </header>
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>제작</footer>
    </div>
  );
}

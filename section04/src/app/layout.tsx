import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`
  );

  if (!response.ok) {
    return <footer>제작</footer>;
  }

  const book: BookData[] = await response.json();
  const bookCount = book.length;

  return (
    <footer>
      <div>제작</div>
      <div>{bookCount}개의 도서가 등록되어있습니다.</div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

// app/(with-searchbar)/page.tsx에서도 /book api를 사용함
// home 페이지인 경우 동일 렌더링에서 동일한 /book api를 두 번 호출함
// 이를 해결하기 위해 Request Memoization이라는 기능을 Next가 추가적으로 제공함
// 명심 Request Memoization !== Cache

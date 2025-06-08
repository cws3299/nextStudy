import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );

  // {cache: "force-cache"}를 안한다면 최상위의 layout에서 현재 footer를 사용하는데,
  // 동적 함수사용여부와 관계없이 캐시를 사용안하므로, 전체가 dynamic page가 되어 풀라우트 불가능
  // 그래서 cache넣음, 다만 이렇게 넣으면 책이 추가될 경우 업데이트가 안됨
  // 일단 책 추가 기능 없으므로 현재는 이렇게 진행

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

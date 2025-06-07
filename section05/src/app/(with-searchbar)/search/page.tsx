import BookItem from "@/components/book-item";
import { BookData } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolved = await searchParams;
  const q = resolved.q ?? "";

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_SERVER_URL
    }/book/search?q=${encodeURIComponent(q)}`,
    { cache: "force-cache" } // 한 번 검색이 된 데이터에 대해서는 좀 더 빠르게 표현이 됨 (다만 도서가 계속 올라오거나 할 경우에는 옵션을 다르게 처리)
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// 현재 페이지의 경우 현재 검색어를 searchParams로 파악이 필요
// 실시간 동적 함수 -> 풀라우트 캐시는 불가능

// 클라이언트 컴포넌트 - 서버 컴포넌트
// 캐시
// Request Memoization
// 풀라우트 캐시

// 앱라우터 - 서버컴포넌트의 대표적인 장점
// 1. 중복 코드 처리
// 2. 페이지에 과도학 데이터 처리로직 (ssr)을 분리하기 쉬움
// 3. JsBundle만 보내는 pageRouter와 달리 JsBundle + RSC Payload등으로 분리

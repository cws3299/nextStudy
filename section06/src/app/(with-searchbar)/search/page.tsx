import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

// 해당 페이지는 쿼리 스트링을 사용하므로 동적페이지, 그런데 강제로 dynamic을 force-static으로 설정할 경우
// 정적페이지로 빌드는 되지만 동적함수들은 자동으로 q든 뭐든 undefined를 리턴하도록 바뀜, 데이터 캐싱 옵션도 force-cache로 바뀜
// export const dynamic = "error";

async function SearchResult({ q }: { q: string }) {
  await delay(1500); // 스트리밍 테스트 용

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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolved = await searchParams;
  const q = resolved.q ?? "";

  return (
    // 이렇게 감싸면 자동으로 streaming 처리가 진행됨, Suspense로 비동기 컴포넌트를 감싸면 스트리밍 기능을 넣어줌
    // key값을 넣으면 경로는 동일하고 쿼리스트링이 다를 경우에도 스트리밍 적용
    // Suspense의 경우 하나의 페이지에서 여러 비동기 컴포넌트를 스트리밍 하기에 좋음
    <Suspense key={q} fallback={<div>loading........</div>}>
      <SearchResult q={q} />
    </Suspense>
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

import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto : 기본값으로 아무 강제 없음, 현재 페이지의 동적 함수, 데이터캐싱등에 따라 알아서 설정
// 2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static : 페이지를 강제로 Static으로 설정
// 4. error: 페이지를 강제로 Static 설정 (Static으로 설정 하면 안되는 데 Static으로 설정되면 빌드시 Next가 오류 발생시켜서 빌드 안되고, 로그 확인 가능)
// dynamic옵션은 사용안하는 걸 추천 -> Next에서 여러 조건을 통해 dynamic, static을 정교하게 정해주기 때문에 해당 옵션을 사용하면 더 좋은 기능이 있는 데 안쓰는 거
export const dynamic = "force-static";

async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } } // revalidate는 dynamic하게 바꾸는 옵션은 아님
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}

// 확실히 좋네 getServerProps같은걸 위에 놓고 나눠서 하지 않고,
// Home컴포넌트안에서 한번에 되네
// 참고로 해당 컴포넌트는 서버에서만 실행되는 서버컴포넌트이므로 console 찍어도 브라우저에서 안찍힘
// 인터랙션은 'use client' 사용해서 클라이언트 컴포넌트에서 사용

// 동적함수는 없음
// 데이터 캐싱에 따라 DynamicPage, StaticPage가 정해짐

// 라우트 세그먼트 옵션
// 모든 컴포넌트들을 동적페이지인지, 정적 페이지인지 체크하기 힘듬
// 강제로 특정 페이지를 동적, 정적 페이지로 설정, revalidate를 강제로 설정
// 옵션은 굉장히 많음

// 클라이언트 라우터 캐시
// 브라우저에 저장되는 캐시 - 페이지 이동을 효율적으로 하기 위해 페이지의 일부 데이터를 브라우저에서 캐싱
// 중복된 레이아웃은 클라이언트 캐시에 저장시켜 놓기

//         클라이언트 ->                  // 서버 ->
// 클라이언트   (클라이언트 라우트 캐시)     // 풀라우트 캐시       // 렌더링 + 리퀘스트 메모이제이션          // 데이터 캐시           // 백엔드 서버

// 서버에서 클라이언트로 데이터를 전달할 때, 렌더링 관점에서만 보면 Html, Js Bundle, RSC Payload등이 있는데
// RSC Payload만 보았을 때, 여러 페이지에서 공통적으로 사용하는 layout같은것도 클라이언트 <-> 풀라우트 혹은 더 깊은 단계 사이에 주고받는 데이터에 중복되는 layout 컴포넌트가 존재
// layout을 클라이언트가 캐싱해서 들고 있으면 서버와 통신때 추가로 받을 필요없는데, 네트워크 비용도 문제지만, 새로 받으면 렌더링 비용도 늘잖아

// 스트리밍
// 서버에서 클라이언트로 어떤 데이터를 넘겨줄 때 (데이터가 크거나, 서버에서 연산량이 클 경우) 데이터를 한 번에 보내지 않고 나눠서 보냄
// 잘게 조개진 데이터를 연속적으로 보내줌 -> 클라이언트 입장에서는 받은 데이터를 순차적으로 표현 -> NextJs는 HTML 스트리밍 기능 제공
// 스트리밍을 이용하면 일단 빠르게 보여줄 수 있음, 느리게 렌더링 되는 부분은 대체 UI보여주면 됨

// SSR, 사전 렌더링, SSG등으로 빌드타임, ISR, 클라이언트 캐시, 풀라우트, 리퀘스트 메모이제이션, 데이터 캐시
// 스트리밍 : HTML을 "조각 단위로" 브라우저에 순차적으로 보내면서 점진적으로 렌더링하는 기능
// 기존 기능들 : 전체 페이지를 한번에 준비해서 한번에 브라우저에 전송
// 서버에서 처리가 컴포넌트가 있으면 기존 기능자체도 빌드타임에 하는거 아닌이상 느려짐, 빌드타임에 작업하는 것이 올바르지 않은 컴포넌트도 많음
// 이때 스트리밍 사용
// 다이나믹 페이지에 주로 사용 (다이나믹 페이지는 풀라우트 캐시 사용 안함) -> 다이나믹 페이지내의 특정 컴포넌트가 너무 느린경우 해당 컴포넌트 제외한 화면먼저 보내고, 이후에 느리게 완성된 컴포넌트 다시 보냄

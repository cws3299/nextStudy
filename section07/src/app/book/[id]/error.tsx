"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

// 동일위치나 하위 페이지에서 error 발생시 해당 컴포넌트가 표현됨
// 에러는 무조건 클라이언트 컴포넌트로 처리 -> 클라이언트 컴포넌트는 서버컴포넌트와 달리 서버, 클라이언트 모두 실행 되므로

// next에서는 props로 현재 페이지의 error를 자동으로 전달해 줌
// reset: 에러가 발생한 컴포넌트를 복구하기 위해 다시 한 번 컴포넌트를 렌더링 시키는 기능을 가진 함수
// reset이라는 메세지는 브라우저 측에서만 재실행, 서버 컴포넌트 내의 로직은 재실행 하지 않음
// reset말고 브라우저를 페이지 새로고침 해주는게 편함 -> 상태등이 전부 리셋되는 문제점이 있음 - window.location.reload()
// 오류가 발생한 부분만 우아하게 reload하려면 - useRouter사용
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      <button
        onClick={() => {
          // router.refresh()는 비동기 메서드임 -> async, await으로 처리 못함, router.refresh는 void를 리턴함, 그래서 startTransition을 사용해야함
          // startTransition -> 하나의 콜백함수를 받아서 콜백함수안에 들어있는 ui 수정 작업을 일괄적으로 처리 -> 그렇기 때문에 순차적으로 동기처럼 진행 됨

          startTransition(() => {
            router.refresh(); // // 현재 페이지에 필요한 서버컴포넌트들을 다시 불러옴 : Next측에 실행 요청 함 (AllBooks, RecoBooks)
            reset(); // 에러 상태를 초기화, 컴포넌트들을 다시 렌더링
          });

          // 1. error 상태 : 클라이언트 상태
          // 2. router.refresh: 서버 컴포넌트 재실행을 요청함, 그러나 클라이언트단의 에러는 리셋안됨
          // 3. reset: 에러를 리셋처리하고 불러온 내용을 새롭게 렌더링 진행
        }}
      >
        다시시도
      </button>
    </div>
  );
}

// 동일 경로 외에 하위 경로에도 적용됨
// (with-searchbar)/search의 page.tsx에도 적용됨

// search 폴더 안에 error.tsx를 작성하면 현재 error.tsx가 적용되지 않고 search폴더안의 error.tsx가 덮어 씌워짐

// book/1 에는 error.tsx를 핸들링 하려면 최상단으로 올리거나, 최상단용 error.tsx 만들어 놓기
// src/app 아래에 바로 error.tsx 놓으면 searchBar에는 적용 안됨
// book/[id] 경로에 error.tsx만들어야 함

// 서버 액션
// 브라우저에서 호출할 수 있는 서버에서 실행되는 비동기 함수
// 기존 api를 통해서 진행하던 작업들 중 몇몇가지를 서버액션에서 처리할 수도 있음

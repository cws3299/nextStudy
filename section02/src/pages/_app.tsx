import GlobalLayout from "@/components/globalLayout";
import "@/styles/globals.css"; // 글로벌 css
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import page from "./test";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};
// 타입1. Next에서 기본 제공해주는 NextPage타입에 getLayout 메서드 추가, book url의 경우 getLayout 메서드가 없으므로 옵셔널 처리

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: NextPageWithLayout }) {
  // 1. App 컴포넌트는 현재 렌더링 요청받은 컴포넌트들을 Component라는 이름으로 받음
  // 2. 함수도 객체이므로 method 추가 가능 (index.tsx)
  // 3. 그걸 꺼내서 중괄호와 함께 호출하는 형태로 사용

  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  // getLayout이라는 함수에 의해서 현재 페이지 역할을 하는 컴포넌트가 searchAbleLayout으로 감싸진 채 렌더링됨
  // /book url과 같이 getLayout이 없는 페이지의 경우 getLayout함수가 없으므로 자기자신을 반환하는 함수를 getLayout으로 설정

  return (
    <GlobalLayout>
      {getLayout(<Component {...pageProps} />)}
      {/* <Component {...pageProps} /> */}
    </GlobalLayout>
  );
}

///////////////////////////////////////////////////////////////////

// export default function App({ Component, pageProps }: AppProps) {
//   // Component는 페이지, pageProps는 모든 Props
//   // NEXT에서는 어떻게 하든 _app.tsx아래에서 page들이 렌더링됨

//   // 1. 모든 페이지 컴포넌트의 부모
//   // 2. 전체 페이지에 공통적으로 포함되는 헤더 컴포넌트 및 비즈니스 로직 관리

//   // a태그는 클라이언트 사이드 렌더링 x
//   // Link 컴포넌트 사용

//   // Programmatic Navigation
//   // 자동으로 이동 (사용자가 직접 클릭해서 이동 x)

//   // _app.tsx는 모든 컴포넌트의 부모 역할을 함 -> 예외적으로 css파일을 불러오도록 허용함 -> global.css파일을 불러옴

//   const router = useRouter();
//   const onClickButton = () => {
//     router.push("/test");
//   };

//   // Programmatic Navigation은 prefetch가 자동으로 안되므로
//   // router와 useEffect를 활용

//   // 일반 이동 페이지중 prefetch를 해제 가능 prefetch={false}
//   useEffect(() => {
//     router.prefetch("/test");
//   });

//   // 일반 버튼형 이동
//   // Link

//   // Programmatic Navigation
//   // useRouter의 push, replace, back

//   return (
//     <>
//       <header>
//         {/* <a href=""></a> */}
//         <Link href={"/"}> index</Link>
//         &nbsp;
//         <Link href={"/search"} prefetch={false}>
//           search
//         </Link>
//         &nbsp;
//         <Link href={"/book/1"}> book/1</Link>
//         <div>
//           <button onClick={onClickButton}>/test 페이지로 이동</button>
//         </div>
//       </header>
//       <Component {...pageProps} />
//     </>
//   );
// }

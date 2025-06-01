import GlobalLayout from "@/components/globalLayout";
import "@/styles/globals.css"; // 글로벌 css
import type { AppProps } from "next/app";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import page from "./test";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>
  );
}

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

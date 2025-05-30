import "@/styles/globals.css"; // 글로벌 css
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  // Component는 페이지, pageProps는 모든 Props
  // NEXT에서는 어떻게 하든 _app.tsx아래에서 page들이 렌더링됨

  // 1. 모든 페이지 컴포넌트의 부모
  // 2. 전체 페이지에 공통적으로 포함되는 헤더 컴포넌트 및 비즈니스 로직 관리
  return (
    <>
      <header>글로벌 헤더</header>
      <Component {...pageProps} />
    </>
  );
}

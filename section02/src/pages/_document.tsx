import { Html, Head, Main, NextScript } from "next/document";

// 기존 react의 index.html과 유사
// 모든 페이지에 공통적으로 적용되어야할 next.js의 index.html과 유사한 역할
// lang 속성을 바꾸면 html의 language가 바뀜
// 모든 페이지에 설정되어야할 메타태그, 폰트, 캐릭터 셋, 구글 애널리틱스의 서드파티 스크립트 넣는 등
// 페이지 전체의 태그를 넣는데 활용 됨
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

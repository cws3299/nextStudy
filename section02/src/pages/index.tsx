import SearchAbleLayout from "@/components/searchAbleLayout";
import style from "./index.module.css";
import { ReactNode } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/bookItem";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

////////////////////////////////////////////

// // import "./index.css"; // 불가능 -> global CSS 파일은 App 컴포넌트에서만 불러올 수 있음
// // import문을 통해 css 파일을 그대로 불러오는걸 제한함 - 다른 페이지의 css코드와 충돌할 수 있으므로
// // index.tsx와 test.tsx가 각각 h1에 같은 속성에 다른 css를 먹일 가능성이 있음

// // CSS Module 기능을 사용하여, 동일한 클래스명이여도 파일마다 유니크하게 변경해주는 기능을 사용해야함
// // CSS Module을 활용하여 파일별 페이지 별로 클래스 명이 중복되는 css 이슈를 해결할 수 있다.
// // Next에서는 _app.tsx 제외하고는 원천적으로 css를 import하지 못하게 막음

// import SearchAbleLayout from "@/components/searchAbleLayout";
// import style from "./index.module.css"; // index.module.css파일안의 속성들이 자동으로 유니크한 값으로 변환되어 style이라는 객체 안에 저장됨
// import { ReactNode } from "react";

// export default function Home() {
//   return (
//     <div>
//       <h1 className={style.h1}>인덱스</h1>
//       <h2 className={style.h2}>H2</h2>
//     </div>
//   );
// }

// // index페이지 (home)의 레이아웃을 설정하여 리턴함
// // Home 함수도 객체임 (자바스크립트의 모든 함수는 객체) 그래서 함수에 메서드 추가 가능

// // 1. 사용자가 index.tsx 페이지로 접속 요청
// // 2. _app.tsx파일 실행되며 Component가 실행됨 (Component = index.tsx) 이때 getLayout이라는 메서드도 _app.tsx에 전달
Home.getLayout = (page: ReactNode) => {
  return <SearchAbleLayout>{page}</SearchAbleLayout>;
};

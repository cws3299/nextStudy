import SearchAbleLayout from "@/components/searchAbleLayout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";
import BookItem from "@/components/bookItem";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetchBooks";
import fetchRandomBooks from "@/lib/fetchRandomBooks";
import Head from "next/head";
// next는 페이지별로 meta태그 설정 가능

export const getStaticProps = async () => {
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
  };
};

export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  useEffect(() => {
    console.log(window.location);
  }, []);

  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////// isr
// import SearchAbleLayout from "@/components/searchAbleLayout";
// import style from "./index.module.css";
// import { ReactNode, useEffect } from "react";
// import BookItem from "@/components/bookItem";
// import { InferGetStaticPropsType } from "next";
// import fetchBooks from "@/lib/fetchBooks";
// import fetchRandomBooks from "@/lib/fetchRandomBooks";

// export const getStaticProps = async () => {
//   console.log("인덱스 페이지");

//   const [allBooks, recoBooks] = await Promise.all([
//     fetchBooks(),
//     fetchRandomBooks(),
//   ]);

//   return {
//     props: {
//       allBooks,
//       recoBooks,
//     },
//     revalidate: 5, // 몇 초주기로 해당 페이지를 재생성 할지 (index 페이지에 대한 재요청이 오면 3초가 넘으면 재생성)
//   };
// };

// export default function Home({
//   allBooks,
//   recoBooks,
// }: InferGetStaticPropsType<typeof getStaticProps>) {
//   useEffect(() => {
//     console.log(window.location);
//   }, []);

//   return (
//     <div className={style.container}>
//       <section>
//         <h3>지금 추천하는 도서</h3>
//         {recoBooks.map((book) => (
//           <BookItem key={book.id} {...book} />
//         ))}
//       </section>
//       <section>
//         <h3>등록된 모든 도서</h3>
//         {allBooks.map((book) => (
//           <BookItem key={book.id} {...book} />
//         ))}
//       </section>
//     </div>
//   );
// }

// ssg용으로 next에서 정의한 함수 명 getStaticProps
// 1. csr
// 2. ssr
// 3. ssr - prefetch
// 4. ssg: 빌드타임에 미리 사용하는 데이터까지 활용하여 정적 페이지 생성 - 당연히 dev 모드에서는 확인 불가 (기본 방식)
// 5. isr: 증분 정적 재 생성 -> ssg 방식으로 생성된 페이지를 일정 시간 주기로 재생성
//// ssg -> 빌드타임에 사전 렌더링 + 사전 데이터로 미리 생성
//// ssg 방식으로 빌드타임에 생성된 페이지를 react-query의 staleTime과 유사한 개념으로 일정시간이 지난 후 해당 페이지 요청이 오면 페이지 재생성
//// 기존 ssg방식의 장점 (매우 빠른 속도로 응답 가능) + 최신데이터 반영 가능 (ssr)
//// revalidate 이후 최초 요청자는 ssg보다는 느리지만 백그라운드에서 next가 자체적으로 ssr보다는 빠르게 페이지 반환, revalidate 된 페이지는 유효시간동안 캐싱되어 있음
//// 일반적으로 isr기법을 사용하는 것을 추천
// 6. on demand isr
//// 시간에 기반으로 데이터가 업데이트 되는 페이지가 아니라, 사용자의 행위를 기반으로 업데이트 되는 페이지의 경우
//// 특정 이벤트등이 발생하면 즉각 변경되거나, 아무 동작 없으면 그냥 유지되면됨
//// isr이 최신 데이터를 즉각적으로 반영하기도 힘들고, 불필요한 페이지의 재생성이 발생
//// ssr로만 할 경우에 서버의 부하가 증가할 수 있음, 사용자가 특정 트리거 행위를 했을 때 revalidate를 발생 시키는 게 on demand isr

//////////////////////////////////////////////////////////////////////////////////////// ssg
// import SearchAbleLayout from "@/components/searchAbleLayout";
// import style from "./index.module.css";
// import { ReactNode, useEffect } from "react";
// import BookItem from "@/components/bookItem";
// import { InferGetStaticPropsType } from "next";
// import fetchBooks from "@/lib/fetchBooks";
// import fetchRandomBooks from "@/lib/fetchRandomBooks";

// export const getStaticProps = async () => {
//   console.log("인덱스 페이지");

//   const [allBooks, recoBooks] = await Promise.all([
//     fetchBooks(),
//     fetchRandomBooks(),
//   ]);

//   return {
//     props: {
//       allBooks,
//       recoBooks,
//     },
//   };
// };

// export default function Home({
//   allBooks,
//   recoBooks,
// }: InferGetStaticPropsType<typeof getStaticProps>) {
//   useEffect(() => {
//     console.log(window.location);
//   }, []);

//   return (
//     <div className={style.container}>
//       <section>
//         <h3>지금 추천하는 도서</h3>
//         {recoBooks.map((book) => (
//           <BookItem key={book.id} {...book} />
//         ))}
//       </section>
//       <section>
//         <h3>등록된 모든 도서</h3>
//         {allBooks.map((book) => (
//           <BookItem key={book.id} {...book} />
//         ))}
//       </section>
//     </div>
//   );
// }

/////////////////////////////////////////////////////////////////////////////// ssr - prefetch
// import SearchAbleLayout from "@/components/searchAbleLayout";
// import style from "./index.module.css";
// import { ReactNode, useEffect } from "react";
// import BookItem from "@/components/bookItem";
// import { InferGetServerSidePropsType } from "next";
// import fetchBooks from "@/lib/fetchBooks";
// import fetchRandomBooks from "@/lib/fetchRandomBooks";

// export const getServerSideProps = async () => {
//   const [allBooks, recoBooks] = await Promise.all([
//     fetchBooks(),
//     fetchRandomBooks(),
//   ]);

//   return {
//     props: {
//       allBooks,
//       recoBooks,
//     },
//   };
// };

// export default function Home({
//   allBooks,
//   recoBooks,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   useEffect(() => {
//     console.log(window.location);
//   }, []);

//   return (
//     <div className={style.container}>
//       <section>
//         <h3>지금 추천하는 도서</h3>
//         {recoBooks.map((book) => (
//           <BookItem key={book.id} {...book} />
//         ))}
//       </section>
//       <section>
//         <h3>등록된 모든 도서</h3>
//         {allBooks.map((book) => (
//           <BookItem key={book.id} {...book} />
//         ))}
//       </section>
//     </div>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import SearchAbleLayout from "@/components/searchAbleLayout";
// import style from "./index.module.css";
// import { ReactNode, useEffect } from "react";
// import books from "@/mock/books.json";
// import BookItem from "@/components/bookItem";
// import { InferGetServerSidePropsType } from "next";

// // getServerSideProps next에서 ssr로 동작할 때 사용하기로 약속한 함수
// // 1. index 페이지로 요청이 옴
// // 2. 백엔드나 서드파티에 데이터 요청 후 가져옴
// // 3. HOME 컴포넌트 동작
// export const getServerSideProps = () => {
//   // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수
//   // 서버 환경에서 초기 한 번만 실행 (컴포넌트 보이기 전)
//   // window.location 이런거 console에 찍어서 확인 불가능 함

//   const data = "hello";

//   // return 구조는 아래와 같아야 함 NextJs의 약속
//   return {
//     props: {
//       data,
//     },
//   };
// };

// // 1. 서버측에서 Home 컴포넌트 실행
// // 2. 브라우저측에서 Hydration 진행시 컴포넌트 실행
// // Home 컴포넌트에서도 window.location 같은거 호출 불가능 함 (1번 경우에는 불가능)
// // 브라우저측 2번에서만 동작 시키고 싶으면 useEffect안에 로직 넣으면 됨
// // useEffect는 기본적으로 컴포넌트가 마운트 된 이후에 실행되기 때문에 2번만 포함됨
// // InferGetServerSidePropsType<typeof getServerSideProps> => next에서 ssr시 컴포넌트가 전달받는 props관련 타입
// // props: InferGetServerSidePropsType<typeof getServerSideProps>

// export default function Home({
//   data,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   useEffect(() => {
//     console.log(window.location);
//   }, []);

//   return (
//     <div className={style.container}>
//       <section>
//         <h3>지금 추천하는 도서</h3>
//         {books.map((book) => (
//           <BookItem key={book.id} {...book} />
//         ))}
//       </section>
//       <section>
//         <h3>등록된 모든 도서</h3>
//         {books.map((book) => (
//           <BookItem key={book.id} {...book} />
//         ))}
//       </section>
//     </div>
//   );
// }

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

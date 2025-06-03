import SearchAbleLayout from "@/components/searchAbleLayout";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/bookItem";
import fetchBooks from "@/lib/fetchBooks";
import { useRouter } from "next/router";
import { BookData } from "@/types";
import Head from "next/head";

// ssg에서는 context 객체에서 query를 못 꺼내옴, 검색 결과를 서버로부터 불러올 수 없음
// // 그럼에도 불구하고 ssg로 만들고 싶으면, getStaticProps에서 진행하지 말고, dataFetching은 react처럼 page페이지 안에서 작업해야함

// export const getStaticProps = async (
//   context: GetStaticPropsContext
// ) => {
//   // context는 현재 브라우저로부터 받은 모든 정보가 포함되어 있음
//   // 서버사이드 렌더링에서 미리 쿼리스트링 정보등 가져올 수 있는 사항
//   // ssg에서는 context 객체에서 query를 못 꺼내옴, 검색 결과를 서버로부터 불러올 수 없음
//   // 그럼에도 불구하고 ssg로 만들고 싶으면, getStaticProps에서 진행하지 말고, dataFetching은 react처럼 page페이지 안에서 작업해야함
//   const q = context.query.q;

//   const books = await fetchBooks(q as string);

//   return {
//     props: {
//       books,
//     },
//   };
// };

// 기본적으로는 ssg방식으로 전달
// 쿼리스트링의 값은 사전렌더링에서 알 수 없으므로 클라이언트 측에서 jsbundle을 받고 csr방식으로 추가 진행됨
export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();
  const q = router.query.q;
  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스 - 검색결과" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchAbleLayout>{page}</SearchAbleLayout>;
};

////////////////////////////////////////////////////////////////////// ssr
// import SearchAbleLayout from "@/components/searchAbleLayout";
// import { ReactNode } from "react";
// import BookItem from "@/components/bookItem";
// import {
//   GetServerSidePropsContext,
//   InferGetServerSidePropsType,
// } from "next";
// import fetchBooks from "@/lib/fetchBooks";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   // context는 현재 브라우저로부터 받은 모든 정보가 포함되어 있음
//   // 서버사이드 렌더링에서 미리 쿼리스트링 정보등 가져올 수 있는 사항

//   const q = context.query.q;

//   const books = await fetchBooks(q as string);

//   return {
//     props: {
//       books,
//     },
//   };
// };

// export default function Page({
//   books,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return (
//     <div>
//       {books.map((book) => (
//         <BookItem key={book.id} {...book} />
//       ))}
//     </div>
//   );
// }

// Page.getLayout = (page: ReactNode) => {
//   return <SearchAbleLayout>{page}</SearchAbleLayout>;
// };

///////////////////////////////////

// import SearchAbleLayout from "@/components/searchAbleLayout";
// import { useRouter } from "next/router"; // pageRouter
// import { ReactNode } from "react";
// // import { useRouter } from "next/navigation"; // APP ROUTER용

// export default function Page() {
//   const router = useRouter();

//   // console.log(router);
//   // router.query에 값이 있음
//   // router가 두 번 console 출력 되는이유
//   // next앱이 쿼리 스트링을 읽는 중에 컴포넌트를 한 번 더 읽음
//   // 첫번째에는 값을 못 가져오지만, 두번째 에서는 가져옴
//   const { name, id } = router.query;
//   // http://localhost:3000/search?name=우석&id=cws

//   return (
//     <h1>
//       Search name {name} {id}
//     </h1>
//   );
// }

// Page.getLayout = (page: ReactNode) => {
//   return <SearchAbleLayout>{page}</SearchAbleLayout>;
// };

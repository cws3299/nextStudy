// 동적경로에 ssg 적용
// book/1, book/2, book/3 ..... -> [id].tsx
// ssg에서 사전에 빌드타임에 렌더링 하기 위해서는 사전렌더링 이전에 경로설정이 필요함
// 1. 경로 설정하기 -> 2. 사전렌더링
// ex. id가 현재 1,2,3이 있다 -> book/1.html, book/2.html, book/3.html .... 사전렌더링
// 사용자가 book/1 요청오면 next는 book/1.html을 반환
// 반드시 동적 ssg하려면 사전렌더링 전에 모든 경로를 설정해야함 getStaticPaths
// getStaticPaths => getStaticProps
import { GetStaticPropsContext, InferGetStaticPropsType } from "next/types";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetchOneBook";

export const getStaticPaths = () => {
  return {
    paths: [
      // url 파라미터는 반드시 문자열 (next의 룰), 아래는 일단 세개 있다고 가정
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    // 브라우저에서 1,2,3이 아닌 존재하지 않는 url로 요청을 보내면 fallback을 표현
    fallback: false,
    // false -> not found 페이지 표현
    // [[...id]].tsx 파일 있으면 거기로 감. 그래서 지움
    // .next/server/pages/book 폴더에서 html 확인 가능
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id; // [id].tsx는 무조건 파라미터가 하나 있으니까 !로 있다고 단언

  const book = await fetchOneBook(Number(id));

  console.log(book);
  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!book) return "book이 없습니다. 재시도 하세요";

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
    <div className={style.container}>
      <div
        className={style.coverImgContainer}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>

      <div className={style.description}>{description}</div>
    </div>
  );
}

////////////////////////////////////////////////////////////////////////// ssr
// import {
//   GetServerSidePropsContext,
//   InferGetServerSidePropsType,
// } from "next/types";
// import style from "./[id].module.css";
// import fetchOneBook from "@/lib/fetchOneBook";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const id = context.params!.id; // [id].tsx는 무조건 파라미터가 하나 있으니까 !로 있다고 단언

//   const book = await fetchOneBook(Number(id));

//   console.log(book);
//   return {
//     props: {
//       book,
//     },
//   };
// };

// export default function Page({
//   book,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   if (!book) return "book이 없습니다. 재시도 하세요";

//   const { title, subTitle, description, author, publisher, coverImgUrl } = book;
//   return (
//     <div className={style.container}>
//       <div
//         className={style.coverImgContainer}
//         style={{ backgroundImage: `url('${coverImgUrl}')` }}
//       >
//         <img src={coverImgUrl} />
//       </div>
//       <div className={style.title}>{title}</div>
//       <div className={style.subTitle}>{subTitle}</div>
//       <div className={style.author}>
//         {author} | {publisher}
//       </div>

//       <div className={style.description}>{description}</div>
//     </div>
//   );
// }

//////////////////////////////////////////////////////////////
// import { useRouter } from "next/router";

// //book/[id]
// // urlParameter는 꼭 숫자가 아니어도 됨
// export default function Page() {
//   const router = useRouter();
//   //   console.log(router);
//   // router.query.id에 값이 들어있음
//   // key값이 id인 이유는 [id].tsx의 이름을 따서 키값으로 설정했기 때문

//   const { id } = router.query;

//   return <h1>Booㅇddㅇ {id}</h1>;
// }

// // book/3000/3000/3000 이런 형태는 지금은 불가능

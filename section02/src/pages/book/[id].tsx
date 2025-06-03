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
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths = () => {
  return {
    paths: [
      // url 파라미터는 반드시 문자열 (next의 룰), 아래는 일단 세개 있다고 가정
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    // 브라우저에서 1,2,3이 아닌 존재하지 않는 url로 요청을 보내면 fallback을 표현
    fallback: true,

    // true : 즉시 생성 + 페이지만 미리 반환, SSR 방식 + 데이터가 없는 폴백상태의 페이지 반환
    // props가 없는 그냥 껍데기만 사용자에게 전달 (getStaticProps같은 데이터 전달 안하고, 페이지껍데기만 사전 렌더링해서 전달) -> props를 이후에 계산에서 따로 보내줌
    // 브라우저에서는 껍데기 먼저 보여주고, 서버에서 props 추가로 보내주면, 이후 props 반영해서 리렌더링 (사용자에게 긴 로딩시간을 주지 않는 대신, 먼저 껍데기를 보여줌)

    // blocking: 즉시 생성 (ssr)
    // book/4 이 요청 올 경우 - blocking옵션 쓰면 ssr처럼 사전렌더링 적용되고 정적 페이지로 생성되며 한 번 만들어진 후에는 .next/server/pages/book 폴더에서 확인 가능하며 이후 ssg처럼 동작
    // 사전 렌더링을 해야하는 시간이 엄청 길 경우, 로딩이 발생함 -> true옵션 추천

    // false -> not found 페이지 표현
    // [[...id]].tsx 파일 있으면 거기로 감. 그래서 지움
    // .next/server/pages/book 폴더에서 html 확인 가능
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id; // [id].tsx는 무조건 파라미터가 하나 있으니까 !로 있다고 단언
  const book = await fetchOneBook(Number(id));

  // book이 없다면 자동으로 fallback으로 가지 않고 바로 book이 없습니다. 재시도 하세요로 전달
  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  // if (router.isFallback) return "로딩중 입니다"; // SSG FallBack:true 이기때문에 메타태그가 정상적으로 새로운 페이지 생성시 seo 설정이 안됨

  // 현재 화면은 ssg상태의 페이지임
  // fallback 상태인 경우는 서버쪽 작업
  if (router.isFallback) {
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
        <div>로딩중입니다.</div>
      </>
    );
  }

  // 해당 작업의 경우 ssr이후 클라이언트에서 렌더링시 발생
  if (!book) return "book이 없습니다. 재시도 하세요";

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
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
    </>
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

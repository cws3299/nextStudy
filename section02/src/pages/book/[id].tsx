import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next/types";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetchOneBook";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
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
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!book) return "book이 없습니다. 재시도 하세요";

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;
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

import SearchAbleLayout from "@/components/searchAbleLayout";
import { useRouter } from "next/router"; // pageRouter
import { ReactNode } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/bookItem";

export default function Page() {
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchAbleLayout>{page}</SearchAbleLayout>;
};

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

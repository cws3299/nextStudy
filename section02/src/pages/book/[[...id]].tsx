import { useRouter } from "next/router";

//book/[...id]
// urlParameter는 꼭 숫자가 아니어도 됨
// book/1000/2000/3000 이런 형태가능
// ...을 추가

// catch all segment라고 next.js에서 부름
// 모든 구간에 대응하는 페이지

// book 이러고 끝나버리면 catch-all-segment로는 불가능
// [id].tsx도 마찬가지
// 이유는 book/ 뒤에 오니까

// book폴더에 index.tsx를 하나 만들어 놓거나
// [[...id]].tsx 처럼 대괄호로 한 번 더 감싸기
// [[id]].tsx에서는 안됨

// [[...]].tsx -> Optional Catch-all Segment
// id라는 동적 세그먼트가 0개 이상 있을떄 매치 됨
// /book, /book/1, book/2/a, book/1/2/dddda 다 가능
// [[]].tsx -> Dynamic Segment
// 반드시 하나 이상의 동적 세그먼트가 존재해야 함

export default function Page() {
  const router = useRouter();
  //   console.log(router);
  // router.query.id에 값이 들어있음
  // key값이 id인 이유는 [id].tsx의 이름을 따서 키값으로 설정했기 때문

  console.log(router);
  const { id } = router.query;
  console.log(id); // [1000, 2000, 3000]

  const secondId = id && id[1] ? id[1] : undefined;
  console.log(secondId); // 2000

  return <h1>Book {secondId}</h1>;
}

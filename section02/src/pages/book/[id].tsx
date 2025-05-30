import { useRouter } from "next/router";

//book/[id]
// urlParameter는 꼭 숫자가 아니어도 됨
export default function Page() {
  const router = useRouter();
  //   console.log(router);
  // router.query.id에 값이 들어있음
  // key값이 id인 이유는 [id].tsx의 이름을 따서 키값으로 설정했기 때문

  const { id } = router.query;

  return <h1>Booㅇㅇ {id}</h1>;
}

// book/3000/3000/3000 이런 형태는 지금은 불가능

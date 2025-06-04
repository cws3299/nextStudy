import ClientComponent from "@/components/clientComponent";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  return (
    <div>
      <ClientComponent>
        <></>
      </ClientComponent>
      Search 페이지 : {q}
    </div>
  );
}

// 0. url parameter등은 props에 자동으로 next가 넣어줌, 구조 분해 할당으로 그냥 가져다 쓰면 됨
// 1. 함수형 컴포넌트인데 async를 사용할 수 있는 이유
//    클라이언트 컴포넌트의 경우 브라우저가 컴포넌트를 즉시 rendering해야 하기 때문에 async로 proimse를 받으면 렌더링이 깨짐
//    서버 컴포넌트의 경우 서버에서 렌더링을 하는게 아니라, 렌더링 결과를 react element 트리로 변환하여 클라이언트에 전달하고, 클라이언트에서 렌더링하므로 async사용 가능

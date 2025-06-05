import style from "./page.module.css";

export default async function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${params.id}`
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  }

  const book = await response.json();

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
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

// 사전 렌더링 과정시

// Page Router의 경우
// ssr - prefetch시
// SSR은 “URL로부터 예측 가능한 데이터만 미리 가져올 수 있다.” 사용자 인터랙션 없이 URL만으로 데이터를 결정할 수 있어야 사전 렌더링이 가능하다.
// URL 변화없이 인터랙션으로 UI가 바뀌는 경우에는 사전 렌더링 이후 클라이언트 렌더링 단에서 추가 요청

// App Router는 서버컴포넌트라는 개념이 등장
// 서버컴포넌트에 async, await를 추가로 사용할 수 있음
// 이를 통해 서버컴포넌트의 Tree Depth가 매우 깊어도 루트에서 데이터만 불러오는게 아니라 각 서버 컴포넌트에서 각각 fetch로 데이터를 불러올 수 있음

// App Router의 Server Component에서 await fetch()를 쓰는 것은
// → Pages Router의 getServerSideProps에서 데이터를 가져오는 것과 동일한 목적과 맥락
// URL 변화없는 인터랙션 데이터 fetch는 기존과 동일

// 서버 컴포넌트 / 클라이언트 컴포넌트
// 나누는 기준은 URL외의 다른 인터랙션에 따른 데이터 변화

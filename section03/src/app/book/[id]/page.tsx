import style from "./page.module.css";

const mockData = {
  id: 1,
  title: "한 입 크기로 잘라 먹는 리액트",
  subTitle: "자바스크립트 기초부터 애플리케이션 배포까지",
  description:
    "자바스크립트 기초부터 애플리케이션 배포까지\n처음 시작하기 딱 좋은 리액트 입문서\n\n이 책은 웹 개발에서 가장 많이 사용하는 프레임워크인 리액트 사용 방법을 소개합니다. 인프런, 유데미에서 5000여 명이 수강한 베스트 강좌를 책으로 엮었습니다. 프런트엔드 개발을 희망하는 사람들을 위해 리액트의 기본을 익히고 다양한 앱을 구현하는 데 부족함이 없도록 만들었습니다. \n\n자바스크립트 기초 지식이 부족해 리액트 공부를 망설이는 분, 프런트엔드 개발을 희망하는 취준생으로 리액트가 처음인 분, 퍼블리셔나 백엔드에서 프런트엔드로 직군 전환을 꾀하거나 업무상 리액트가 필요한 분, 뷰, 스벨트 등 다른 프레임워크를 쓰고 있는데, 실용적인 리액트를 배우고 싶은 분, 신입 개발자이지만 자바스크립트나 리액트 기초가 부족한 분에게 유용할 것입니다.",
  author: "이정환",
  publisher: "프로그래밍인사이트",
  coverImgUrl:
    "https://shopping-phinf.pstatic.net/main_3888828/38888282618.20230913071643.jpg",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;

  const { title, subTitle, description, author, publisher, coverImgUrl } =
    mockData;

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

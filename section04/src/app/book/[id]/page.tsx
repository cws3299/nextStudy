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

// Next의 데이터 캐시
// const response = await fetct('~/api', {catch: "force-cache"}) 이런식으로 가능
// Next에서는 axios등에서는 활용 불가능함, 오직 fetch method를 확장해야함
// 여기에서 fetch는 브라우저의 fetch가 아니라 nextJs에서 확장한 서버 클라이언트용 fetch
// 클라이언트 컴포넌트는 react query + axios구조로, 서버컴포넌트는 fetch로 하는게 캐시에 좋을 듯?
// 다만 토큰 실시간 유효성 검사를 axios.intercepter에서 했는데 서버컴포넌트 fetch에는 없어서 따로 만들어야 할듯

// 백엔드 서버로부터 불러온 데이터를 거의 영구적으로 보관하기 위해 사용
// 0. 아무 설정 안한다면 기본값이 캐싱 안함 auto no cache (15버전에 바뀜)
// 1. {cache: 'no-store'} : 캐싱을 아예 안한다는 옵션 (요청올때마다 데이터 캐시에 있는걸 사용하지 않고 백엔드 서버에 바로 요청)
// 2. {cache: 'force-cache'} : 무조건 캐싱하고, 초기 요청 이후에는 다시 요청하지 않음
// 3. {next: {revalidate: 3}} : 특정시간을 주기로 캐시 업데이트 (isr과 유사) / 3초마다 요청이 없는데도 업데이트는 아니고, 3초 후 첫 요청 시 revalidate발생
// 4. {next: {tags: ['a]}}: on-demand-revalidate -> 요청이 들어왔을 때 최신화 함

// A컴포넌트 B컴포넌트가 서로다른 캐시 옵션으로 동일한 API를 패치할 경우 -> 서로에게 영향 없음
// Next App Router의 fetch는 내부적으로 컴포넌트위치 + fetch 옵션 + URL 조합으로 캐시키 생성

// Request Memoization
// 하나의 페이지를 렌더링 하는 동안에 중복된 api요청을 캐싱하기 위해 존재함, 렌더링이 종료되면 모든 캐시가 소멸됨
// 중복된 데이터 패칭 최적화 기능
// Layout.tsx [Request A, Request B]
// Page,tsx [Request A, Request B, Request C]
// [Request A, Request B, Request C] :

// 동일한 렌더링 사이클 안에있으면, 다른 컴포넌트여도 catch 설정 상관없이 Request 메모이제이션
// 데이터 캐시 개념 !== Request Memoization

// Request Memoization이 왜 필요해?
// 서버컴포넌트의 도입때문에
// Page Router는 서버 사이드 렌더링의 prefetch시 root에서만 데이터를 가져오지만
// App Router의 서버 컴포넌트는 root에서만 데이터를 가져와서 props로 전달하는게 아니라 각 사용하는 노드에서 fetch를 독립적으로 할 수 있음
// 다만 이럴경우 너무 많은 fetch요청이 필요한 경우가 있음

// 풀라우트 캐시 (서버컴포넌트에서만)
// Next 서버측에서 빌드 타임에 특정 페이지의 렌더링 결과를 캐싱하는 기능
// 1.클라이언트 요청, 2.풀라우트 캐시, 3.(사전)렌더링, 4.리퀘스트 메모이제이션, 5.데이터 캐시, 6.백엔드 서버
// 풀라우트 캐시 == Page Router의 SSG와 유사함
// Revalidate가 가능함 (isr처럼) -> 데이터 캐시만 업데이트 되는게 아니라, 풀라우트 캐시도 revalidate 주기에 따라 새로 저장
// Revalidate 주기 이후 추가 요청인 경우에는 일단 기존 화면 보여주고, 데이터 캐시업데이트하고 풀라우트 캐시도 업데이트

// Next가 알아서 Dynamic Page, Static Page를 나눠줌
// Dynamic Page: 특정 페이지가 접속 요청을 받을 때마다 변화가 생기거나, 데이터가 달라지는 경우
// 1. cache가 no-store인 경우
// 2.동적 함수 (요청에 따라 값이 변하는 기능, 예를 들어 쿠키, 헤더, 쿼리스트링 등)를 사용하는 컴포넌트가 있을 때
// 이외는 모두 Static Page

// 동적함수 사용, 데이터 캐시 사용 -> DynamicPage
// 동적함수 사용, 데이터 캐시 사용 안함 -> DynamicPage
// 동적함수 사용 안함, 데이터 캐시 사용 안함 -> DynamicPage
// 동적함수 사용 안함, 데이터 캐시 사용 -> StaticPage (풀라우트 캐시 적용 가능)
// (빌드타임에 미리 생성 후, 캐싱이 되서 클라에서 요청오면 2번 단계에서 바로 리턴 : 굉장히 빠름)

// 서버컴포넌트 <-> 클라이언트 컴포넌트
// 서버컴포넌트 (Dynamic Page <-> Static Page)
// Dynamic Page (Cache 종류에 따라)
// Static Page(Revalidate에 의해 staleTime이 지났다면 데이터 캐시 update하고, 풀라우트 캐시도 업데이트 : isr개념)

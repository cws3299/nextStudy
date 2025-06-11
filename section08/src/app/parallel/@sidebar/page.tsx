export default function Page() {
  return <div>@슬롯</div>;
}

// @슬롯: 병렬로 렌더링 될 페이지 컴포넌트를 보관하는 폴더
// 자신의 부모 레이아웃 컴포넌트에게 props로 자동으로 전달되고, layout에서는 @sidebar 폴더와 같은 sidebar로 불러올 수 있음
// parallel의 layout에서 아래 두개를 props로 사용 가능함
// parallel/pages.tsx, parallel/@sidebar/pages.tsx

// () routeGroup처럼 @ slot도 url에는 영향을 주지 않음
// 슬롯에는 갯수 제한이 없음 -> layout 컴포넌트에서 수 십개를 불러올 수 있음
// next가 아직 완벽하지 않아 .next폴더 삭제후 재부팅 하면 해결되는 경우 많음

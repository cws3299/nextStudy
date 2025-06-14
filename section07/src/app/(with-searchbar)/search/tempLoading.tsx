export default function tempLoading() {
  return <div>Loading...</div>;
}

// 동일 경로만 스트리밍 되는게 아니라
// layout처럼 자녀의 자녀 page까지 전부 영향이 감

// async라는 키워드가 붙어있는 비동기 컴포넌트에만 영향을 줌

// page 컴포넌트에만 스트리밍을 적용할 수 있음, layout.tsx나 컴포넌트 폴더에는 불가능
// 별도의 컴포넌트에도 스트리밍 적용하고 싶을 경우 리액트의 suspense 적용

// loading.tsx로 설정된 스트리밍 페이지는, 쿼리스트링이 변경될 경우에는 트리거링 안됨
// 경로 + 쿼리스트링 변경시에는 적용, 페이지의 경로는 유지  + 쿼리스트링만 변경될 경우에는 스트리밍 동작 안함
// 이런 경우에도 react의 suspense 활용

// loading.tsx인데 suspense사용하기 때문에 불필요해서 일단 이름 바꿔놓음

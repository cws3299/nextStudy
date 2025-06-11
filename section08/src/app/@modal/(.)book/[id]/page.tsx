import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal";

export default function Page(props: any) {
  return (
    <Modal>
      <BookPage {...props} />
    </Modal>
  );
}

// 사용자가 클라이언트 사이드 렌더링 방식으로 / -> /book/1로 이동
// book[id]가 아니라 (.)/book/1이 대신 렌더링 됨

// / 페이지에서 책 클릭시 모달형태로 인스타그램처럼 띄울 예정

// 뒷 배경을 모달이 띄워지기 전 페이지가 병렬로 띄워지도록 기능 추가
// 하나의 화면에 모달도 띄우고 싶고, 추가 페이지도 띄우고 싶다 -> parallel route

// 병렬 라우팅
// @modal/(.)book/[id]/page.tsx
// @ 병렬 라우팅이니까 @modal폴더의 부모 layout 즉 전체 layout에 전달됨
// modal속의 페이지와 일반 페이지가 병렬적으로 잘 렌더링 됨
// modal이 없는 일반 경우 default.tsx가 처리

// 인터셉트 라우팅
// (.)book/[id]/page.tsx니까 book/[id]/page.tsx 이때 적용됨
// /

// 병렬 라우팅과 인터셉터 라우팅을 함께 사용한다면, 특정 아이템의 상세 페이지를 모달로 표현 가능

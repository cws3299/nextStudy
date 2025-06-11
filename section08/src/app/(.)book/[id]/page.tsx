import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal";

export default function Page(props: any) {
  return (
    <div>
      인터셉터 성공
      <Modal>
        <BookPage {...props} />
      </Modal>
    </div>
  );
}

// 사용자가 클라이언트 사이드 렌더링 방식으로 / -> /book/1로 이동
// book[id]가 아니라 (.)/book/1이 대신 렌더링 됨

// / 페이지에서 책 클릭시 모달형태로 인스타그램처럼 띄울 예정

import { ReviewData } from "@/types";
import style from "./reviewItem.module.css";
import ReviewItemDeleteButton from "./reviewItemDeleteButton";

export default function ReviewItem({
  content,
  author,
  createdAt,
  id,
  bookId,
}: ReviewData) {
  return (
    <div className={style.container}>
      <div className={style.author}>{author}</div>
      <div className={style.content}>{content}</div>
      <div className={style.bottomContainer}>
        <div className={style.date}>{new Date(createdAt).toLocaleString()}</div>
        <ReviewItemDeleteButton reviewId={id} bookId={bookId} />
      </div>
    </div>
  );
}

// 삭제하기 버튼 -> 서버액션 실행
// 컴포넌트 전체 클라이언트 컴포넌트로 전환? X
// 삭제하기 버튼만 따로 클라이언트 컴포넌트로 빼내기

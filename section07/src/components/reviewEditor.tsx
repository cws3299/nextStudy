import style from "./reviewEditor.module.css";
import { createReviewAction } from "@/actions/createReviewAction";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      {/* // 브라우저에서 폼태그 제출하면 action props로 설정된 createReviewAction이라는 서버액션이 실행 */}
      {/* 파일 분리했으므로 bookId는 따로 보내줘야 함 */}
      <form className={style.formContainer} action={createReviewAction}>
        {/* <input name="bookId" value={bookId} hidden /> // 이렇게 하면 value는 주는데 value를 수정하는 onChange는 없다고 Next가 판단해서 에러 발생 -> readOnly추가 하면 됨*/}
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea required name="content" placeholder="리뷰내용" />
        <div className={style.submitContainer}>
          <input required name="author" placeholder="작성자" />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
}

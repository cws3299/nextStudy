"use client";

import style from "./reviewEditor.module.css";
import { createReviewAction } from "@/actions/createReviewAction";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  // 기존 폼의 액션, 초기값
  // 반환값은 세개고정 -> formAction을 기존 action함수 호출부에 넣기
  // useActionState로 감쌀경우 createReviewAction(서버액션)의 첫번째 변수에 state가 들어감
  // createReviewAction 리턴 반환문 수정

  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      {/* // 브라우저에서 폼태그 제출하면 action props로 설정된 createReviewAction이라는 서버액션이 실행 */}
      {/* 파일 분리했으므로 bookId는 따로 보내줘야 함 */}
      <form className={style.formContainer} action={formAction}>
        {/* <input name="bookId" value={bookId} hidden /> // 이렇게 하면 value는 주는데 value를 수정하는 onChange는 없다고 Next가 판단해서 에러 발생 -> readOnly추가 하면 됨*/}
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰내용"
        />
        <div className={style.submitContainer}>
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="작성자"
          />
          <button disabled={isPending} type="submit">
            {isPending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}

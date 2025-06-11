"use client";

import { deleteReviewAction } from "@/actions/deleteReviewAction";
import { useActionState, useEffect, useRef } from "react";

export default function ReviewItemDeleteButton({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" value={reviewId} hidden />
      <input name="bookId" value={bookId} hidden />
      {isPending ? (
        <div>...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
      )}
    </form>
  );
}

// submit메소드는 유효성검사나 이런거 하지 않고 강제로 폼에 제출함
// requestSubmit는 이에 비해 보다 안전함
// 가끔은 버튼이 아닌 div나 a태그로 폼을 제출할때 useRef + requestSubmit을 활용

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import style from "./serachbar.module.css";

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const q = searchParams.get("q");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className={style.container}>
      <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}

// useSearchParams 이런 쿼리스트링은 빌드타임에는 존재 할 수 없음
// 해당 파일은 쿼리스트링 이런걸 쓰니까 사전렌더링은 진행 안되게 해야돼, 이때 Suspense에서 감싸주면 됨
// 미완성 상태로 남겨두고, Suspense안의 컴포넌트에서 작업대기중인 미완성 작업(비동기)이 완료되면 그때 렌더링 진행
// 쿼리스트르링을 빌드타임에 안가져오고 실제 클라이언트 타임에 작업이 진행됨

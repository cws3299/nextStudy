import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from "./searchAbleLayout.module.css";

export default function SearchAbleLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const q = router.query.q as string;

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

  const onSubmitKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          placeholder="검색어를 입력해주세요..."
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onSubmitKeyDown}
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}

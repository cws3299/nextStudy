"use client";

import { useState } from "react";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input value={search} onChange={onChangeSearch} />
      <button>검색</button>
    </div>
  );
}

// appRouter에서는 page.tsx나 layout.tsx등이 아니며 co-location기능을 활용해서 페이지에 사용되는 위젯을 묶어 놓을 수 있음

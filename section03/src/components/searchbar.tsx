"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Searchbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <input value={search} onChange={onChangeSearch} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}

// appRouter에서는 page.tsx나 layout.tsx등이 아니며 co-location기능을 활용해서 페이지에 사용되는 위젯을 묶어 놓을 수 있음
// appRouter의 prefetch
// 현재 페이지에서 이동가능한 페이지의 html을 미리 가져옴
// B,C 페이지로 이동가능한 A페이지에 로드했을 때, B,C 페이지의 JsBundle 이나 Rsc Payload를 미리 가져오고 페이지 이동시 표현
// 그러나 JsBundle이나 RSC Payload만 가지고 부족한 경우가 있는데 이때는 추가적인 api 응답 등을 모두 한번에 hydration함
// B,C 페이지가 동적 페이지일 경우 JsBundle은 생략하고 RSC Payload만 불러옴 -> build시 로그에서 static과 dynamic으로 확인 가능
// 기본적으로는 모든 페이지가 static / 그러나 파라미터나 쿼리스트링 쓰거나 빌드타임에 진행시 이슈가 발생할 가능성이 있으면 next가 자동으로 dynamic페이지로 설정
// Static -> prefetch에서 RSC Payload와 Js Bundle 모두 가져옴
// Dynamic -> prefetch시 RSC Payload만 가져옴

// 복습
// Page Router에서는 Rsc payload 이런거 없이 ssr-prefetch시 무조건 jsbundle 다 가져옴

// 1. js Bundle
// 2. RSC payload
// 3. 사용자의 동적 추가 요청 api

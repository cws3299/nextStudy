import { ReactNode } from "react";
import Searchbar from "./searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
}

// 폴더별로 layout 세팅
// /search/setting 이라는 곳의 page.tsx를 띄울때
// search폴더와 search/setting 폴더에 모두 layout.tsx가 있다면 layout두개 중첩 후에 page.tsx가 표현됨
// layout 컴포넌트는 자동으로 children이라는 props로 page.tsx가져옴

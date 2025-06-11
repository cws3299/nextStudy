import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({
  children,
  sidebar,
  feed,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  feed: ReactNode;
}) {
  return (
    <div>
      <div>
        {/* // sidebar, fee, chilren이 렌더링됨 */}
        <Link href={"/parallel"}>pararall</Link>
        &nbsp;
        {/* // sidebar, children은 그대로 렌더링 되지만 feed가 아니라 feed/setting의 page가 렌더링됨 */}
        <Link href={"/parallel/setting"}>pararall/setting</Link>
      </div>
      {sidebar}
      {feed}
      {children}
    </div>
  );
}

// Layout 컴포넌트의 관점에서 props를 보면 이해하기 쉬움
// /parallel/setting 페이지에서 children은 알겠어
// sidebar는 왜 나오지? setting폴더안에 sidebar는 없어서 404가 나와야 하는데, next는 그냥 이전 페이지를 유지하도록 처리함 그래서 /parallele에서 나오던 sidebar가 그대로 나옴
// setting/page는 당연히 url경로에 따라 거기에 맞는 화면이 나옴
// 이런 방식은 오직 클라이언트 사이드 렌더링 방식으로 이동될때 한정 -> 그냥 새로고침 하거나 하면 404가 발생함
// /parallel을 오지 않고 url로 그냥 /parallel/setting 접속시 이전 값을 찾을 수 없어 404에러가 발생함
//-> 그래서 slot별로 렌더링할 디폴트 페이지 설정 필요

// 이거 전체화면에 여러 페이지들이 나오고 특정 페이지들만 이동되도록 하면 좋겠네

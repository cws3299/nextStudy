import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* <div>{new Date().toLocaleString()}</div> 인덱스 페이지에서 표현된 시간과 검색후 서치페이지에서 시간이 동일 (이동하는 경우에는 클라이언트 캐시가 가지고 있음, 그러나 새로고침같은 경우는 데이터 사라짐) */}
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>

      {children}
    </div>
  );
}

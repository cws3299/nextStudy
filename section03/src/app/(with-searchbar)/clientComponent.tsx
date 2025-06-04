"use client";

import { ReactNode } from "react";

// import ServerComponent from "./serverComponent";

export default function ClientComponent({ children }: { children: ReactNode }) {
  console.log("클라이언트 컴포넌트");
  return (
    <div>
      {children}
      {/* <ServerComponent /> */}
    </div>
  );
}

// ServerComponent를 import하지 않고 children으로 넣어주는 형태로 할 경우 서버 컴포넌트를 클라이언트 컴포넌트로 자동 변환 하지 않음
// page.tsx에서는 ClientComponent안에 ServerComponent가 있다고 선언함 해놓으면 됨 (추상)

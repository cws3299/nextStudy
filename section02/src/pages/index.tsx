// import "./index.css"; // 불가능 -> global CSS 파일은 App 컴포넌트에서만 불러올 수 있음
// import문을 통해 css 파일을 그대로 불러오는걸 제한함 - 다른 페이지의 css코드와 충돌할 수 있으므로
// index.tsx와 test.tsx가 각각 h1에 같은 속성에 다른 css를 먹일 가능성이 있음

// CSS Module 기능을 사용하여, 동일한 클래스명이여도 파일마다 유니크하게 변경해주는 기능을 사용해야함
// CSS Module을 활용하여 파일별 페이지 별로 클래스 명이 중복되는 css 이슈를 해결할 수 있다.
// Next에서는 _app.tsx 제외하고는 원천적으로 css를 import하지 못하게 막음

import style from "./index.module.css"; // index.module.css파일안의 속성들이 자동으로 유니크한 값으로 변환되어 style이라는 객체 안에 저장됨

export default function Home() {
  return (
    <div>
      <h1 className={style.h1}>인덱스</h1>
      <h2 className={style.h2}>H2</h2>
    </div>
  );
}

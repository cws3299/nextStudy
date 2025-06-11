import type { BookData } from "@/types";
import Link from "next/link";
import style from "./book-item.module.css";
import Image from "next/image";

export default function BookItem({
  id,
  title,
  subTitle,
  description,
  author,
  publisher,
  coverImgUrl,
}: BookData) {
  return (
    <Link href={`/book/${id}`} className={style.container}>
      {/* <img src={coverImgUrl} /> */}
      <Image
        src={coverImgUrl}
        width={80}
        height={105}
        alt={`도서 ${title}의 표지 이미지 `}
      />
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <br />
        <div className={style.author}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}

// 웹페이지 용량의 절반 이상이 이미지가 차지함

// - 이미지 최적화는 필수적임
//   - webp, AVIF등의 차세대 형식으로 변환하기
//   - 디바이스 사이즈에 맞는 이미지 불러오기
//   - 레이지 로딩 적용하기
//   - 블러 이미지 활용하기
//   - 기타 등등...

// - NEXT에서는 자체적으로 이미지 최적화를 해줌
//   - NEXT의 IMAGE라는 내장 컴포넌트만 가지고 최적화 가능

// - 현재 화면에 표시되는 이미지보다 훨씬 큰 사이즈의 이미지를 불러옴
// - 현재 화면에 나타나지 않지만 화면에 있어서 모든 이미지 파일들을 전부 불러옴
// - jpeg 파일임

// width와 height를 명시 -> 사이즈를 통해서 필요이상으로 큰 이미지는 불러오지 않기 위해
// Image 컴포넌트를 이용해 특정 이미지 최적화할때 Next 프로젝트에 저장된 이미지가 아니라, 외부 서버의 이미지를 사용하는거라면 NEXT보안때문에 이슈가 발생
// next.config.js를 수정해서 특정 도메인에서 가져오는 이미지는 안전하다고 말해주기

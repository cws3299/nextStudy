import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/"); // handler함수를 호출시, revalidate를 발생시키고 새로 페이지를 생성함, 경로를 인수로 넣음
    return res.json({ revalidate: true });
  } catch {
    res.status(500).send("Revalidation Failed");
  }
}

// api폴더의 revalidate를 기반으로 동작 (프레임워크 룰)
// 파일명은 다른걸로 해도 됨
// 1. Next.js는 빌드 시 getStaticProps로 만든 페이지들의 경로 정보를 저장해둠
// 2. res.revalidate('/') 이런형태로 요청을 하면 next가 자동으로 ssg페이지 중에 확인해서 있으면 revalidate해줌

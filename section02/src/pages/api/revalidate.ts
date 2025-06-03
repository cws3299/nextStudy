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

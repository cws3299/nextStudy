// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// 1. pages/api/hello -> api 구조
// 2. handler함수가 실행
// 3. localhost:port/api/hello
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}

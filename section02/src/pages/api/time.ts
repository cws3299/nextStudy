import type { NextApiRequest, NextApiResponse } from "next";

// 1.pages/api/times -> api/times 라는 api 생성
// 2. NextApiRequest, NextApiResponse import 후에 handler인자에 타입 적용
// 3. handler에서 json 반환
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const date = new Date();
  res.status(200).json({ time: date.toLocaleString() });
}

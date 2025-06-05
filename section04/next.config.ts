import type { NextConfig } from "next";

// 데이터 패칭시마다 logging 확인 용
// 터미널에서 api별 응답 속도, 캐시상태 등 확인가능
// 캐시된 데이터는 .next/catch/fetch-cache에서 확인가능
const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;

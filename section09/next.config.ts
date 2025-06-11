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
  images: {
    domains: ["shopping-phinf.pstatic.net"], // 해당 도메인으로 부터 불러오는 이미지는 안전하다고 해줌, 기존과 비교했을때 Type과 Size도 낮고, 이미지도 lazy loading알아서 해줌
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 해커톤용: 빌드 중 타입/린트 에러로 배포가 막히지 않게 (발표 전 급할 때 생명줄)
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;

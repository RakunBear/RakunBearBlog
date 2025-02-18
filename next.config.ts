import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  // 기타 Next.js 설정 옵션
  reactStrictMode: true,
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  /* Docker HotReload Error 방지 코드 (Docker 키는데 오래걸려 제거) */
  // webpackDevMiddleware: (config) => {
  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300,
  //   }
  //   return config;
  // },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // 기타 MDX 관련 옵션
  },
});

export default withMDX(nextConfig);
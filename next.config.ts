import withSerwistInit from "@serwist/next";
import { NextConfig } from "next";

import { isProduction } from "data/global";

const withSerwist = withSerwistInit({
  swSrc: "src/service-worker/sw.ts", // file to be used for compiling service worker
  swDest: "public/sw.js",
  disable: !isProduction
});

const cspHeader = `
    default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;
    script-src * 'unsafe-inline' 'unsafe-eval' data: blob:;
    style-src 'self' 'unsafe-inline';
    img-src * data:;
    font-src 'self' data:;
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `;

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, "")
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on"
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          }
        ]
      }
    ];
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/"
      }
    ],
    unoptimized: true
  },
  experimental: {
    scrollRestoration: true
  },
  compiler: {
    styledComponents: true
  }
};

module.exports = withSerwist(nextConfig);

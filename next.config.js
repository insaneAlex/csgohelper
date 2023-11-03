/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includesPaths: [path.join(__dirname, 'styles')]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'steamcommunity-a.akamaihd.net',
        port: '',
        pathname: '/economy/image/**'
      }
    ]
  }
};

module.exports = nextConfig;

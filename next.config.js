/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includesPaths: [path.join(__dirname, 'styles')]
  },
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'steamcommunity-a.akamaihd.net', port: '', pathname: '/economy/image/**'},
      {protocol: 'https', hostname: 'avatars.steamstatic.com', port: ''}
    ]
  }
};

module.exports = nextConfig;

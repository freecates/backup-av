const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  images: {
      domains: [
          'backup-av-data.vercel.app',
          'cms2.backup-av.com',
      ],
  },
  i18n: {
      locales: ['es', 'ca'],
      defaultLocale: 'es',
  },
  pwa: {
      dest: 'public',
      runtimeCaching,
      disable: process.env.NODE_ENV === 'development',
      buildExcludes: [
          /middleware-manifest\.json$/,
          /_middleware.js$/,
          /_middleware.js.map$/,
          /middleware-build-manifest\.js$/,
          /middleware-react-loadable-manifest\.js$/,
      ],
  },
  swcMinify: true,
  reactStrictMode: true,
})
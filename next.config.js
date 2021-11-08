const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  images: {
      domains: [
          'backup-av-data.vercel.app',
          'cms.backup-av.com',
      ],
  },
  i18n: {
      locales: ['es'],
      defaultLocale: 'es',
  },
  pwa: {
      dest: 'public',
      runtimeCaching,
      disable: process.env.NODE_ENV === 'development',
      buildExcludes: [/middleware-manifest.json$/]
  },
  reactStrictMode: true,
})
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  images: {
      domains: [
          'backup-av-data.vercel.app',
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
  },
  reactStrictMode: true,
})
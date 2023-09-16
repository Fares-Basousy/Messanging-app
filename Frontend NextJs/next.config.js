/** @type {import('next').NextConfig} */
const nextConfig = {async redirects() {
    return [
      // if the header `x-redirect-me` is present,
      // this redirect will be applied
      {
        source: '/',
        has: [
          {
            type: 'cookie',
            key: 'access_token',
          },
        ],
        permanent: false,
        destination: '/dashboard',
      },
      // if the header `x-dont-redirect` is present,
      // this redirect will NOT be applied
      {
        source: '/',
        missing: [
          {
            type: 'cookie',
            key: 'access_token',
          },
        ],
        permanent: false,
        destination: '/auth/login',
}]
},}

module.exports = nextConfig

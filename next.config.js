/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  crossOrigin: 'anonymous',
  env: {
    graphCmsUrl: 'https://api-us-west-2.graphcms.com/v2/ckz6cwva60jqu01xtbztmgcbz/master',
    apiUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:7709' : 'https://api.praxisco.us',
    segmentKey: 'H0jLU0Du35HX6AqumOMYjw0AcBsHLNc0',
    abstractApiKey: '5931c824d60f406bbdf170ce8cdc9dbe'
  },
  async redirects() {
    return [
      {
        source: '/search',
        destination: '/training',
        permanent: true,
      },
      {
        source: '/hq',
        destination: '/hq/login',
        permanent: true,
      },
    ]
  },
}
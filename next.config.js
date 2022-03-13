/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  crossOrigin: 'anonymous',
  env: {
    graphCmsUrl: 'https://api-us-west-2.graphcms.com/v2/ckz6cwva60jqu01xtbztmgcbz/master',
    apiUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:7709' : 'https://fast-api.praxisco.us'
  }
}
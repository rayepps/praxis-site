/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  crossOrigin: 'anonymous',
  env: {
    graphCmsUrl: 'https://api-us-west-2.graphcms.com/v2/ckz6cwva60jqu01xtbztmgcbz/master',
    // apiUrl: 'https://api.praxisco.us'
    apiUrl: 'http://localhost:7709'
  }
}
const nextConfig = {
  // reactStrictMode: true,
  // assetPrefix: "./",
  images: {
    unoptimized: true
  },
  env: {
    API_URL: process.env.API_URL,
    STRAPI_URL: process.env.STRAPI_URL,
    STRAPI_TOKEN: process.env.STRAPI_TOKEN,
    RECAPCHA_CHECKOUT_KEY: process.env.RECAPCHA_CHECKOUT_KEY,
    RECAPCHA_CHECKOUT_SECRET: process.env.RECAPCHA_CHECKOUT_SECRET,
    API_KEY_PACTO: process.env.API_KEY_PACTO
  },
  async headers() {
    return [
      {
        source: "/pages/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
}

module.exports = nextConfig

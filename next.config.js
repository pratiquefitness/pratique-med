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
  }
}

module.exports = nextConfig

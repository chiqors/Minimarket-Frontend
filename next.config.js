/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        APP_NAME: "Minimarket App",
        APP_DESCRIPTION: "A small minimarket web app",
        APP_VERSION: "1.0.0",
        APP_PROD_MODE: "false",
        APP_FRONTEND_PRODUCTION_URL: "",
        APP_FRONTEND_DEVELOPMENT_URL: "http://localhost:3000",
        APP_BACKEND_PRODUCTION_URL: "",
        APP_BACKEND_DEVELOPMENT_URL: "http://localhost:8080",
        APP_BACKEND_API_PATH: "/api",
    }
}

module.exports = nextConfig

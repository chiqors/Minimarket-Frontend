// This file is used to store all the configuration variables for the app.

export const APP_NAME = process.env.APP_NAME;

export const APP_PROD_MODE = process.env.APP_PRODUCTION_MODE;

export const APP_FRONTEND_URL =
    process.env.APP_PROD_MODE === "true"
        ? process.env.APP_FRONTEND_PRODUCTION_URL
        : process.env.APP_FRONTEND_DEVELOPMENT_URL;

export const APP_BACKEND_URL =
    process.env.APP_PROD_MODE === "true"
        ? process.env.APP_BACKEND_PRODUCTION_URL
        : process.env.APP_BACKEND_DEVELOPMENT_URL;

export const APP_BACKEND_API_PATH = process.env.APP_BACKEND_API_PATH;
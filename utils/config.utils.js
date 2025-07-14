import dotenv from "dotenv"
dotenv.config()

export const config = {
    firebase: {
        apiKey: process.env.API_KEY || "YOUR API_KEY",
        authDomain: process.env.AUTH_DOMAIN || "YOUR AUTH_DOMAIN",
        projectId: process.env.PROJECT_ID || "YOUR PROJECT_ID",
        storageBucket: process.env.STORAGE_BUCKET || "YOUR STORAGE_BUCKET",
        messagingSenderId: process.env.MESSAGING_SENDER_ID || "YOUR MESSAGING_SENDER_ID",
        appId: process.env.APP_ID || "YOUR APP_ID",
        measurementId: process.env.MEASUREMENT_ID || "YOUR MEASUREMENT_ID"
    },
    server: {
        port: process.env.PORT || 3000
    },
    jwt: {
        jwtKey: process.env.JWT_SECRET || "YOUR SECRET KEY"
    }
};

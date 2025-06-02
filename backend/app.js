import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import hpp from "hpp";
import path from "path";


// Import Essential Filesystem
import router from "./src/routes/api.js";
import {
    Max_JSON_SIZE,
    URL_ENCODER,
    REQUEST_LIMIT_TIME,
    REQUEST_LIMIT_NUMBER,
    WEB_CACHE
} from "./src/config/config.js";
import errorHandler from "./src/middleware/errorHandler.js";

const app = express();

// Global Application Middleware
const corsOptions = {
    origin: "https://care-hop-service.vercel.app",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: Max_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODER }));
app.use(hpp());
app.use(cookieParser());
// app.use(
//     helmet({
//         crossOriginEmbedderPolicy: false,
//     })
// );
app.use(xss());

// Rate Limiting middleware
const limiter = rateLimit({
    windowMs: REQUEST_LIMIT_TIME,
    max: REQUEST_LIMIT_NUMBER,
    message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// Web Caching
app.set("etag", false);

// MongoDB Connection

app.get("/", (req, res) => {
    // Server to client
    res.send("Welcome to you express server");
});

// Set API Routes
app.use("/api/v1", router); // Notice the change here


// app.use(express.static("client/dist"));

// Add React Front End Routing
// app.get("*", function (req, res) {
//   res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
// });

// Error handling for unexpected routes
app.use((req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: "Routes Not Found",
    });
});

// General server error handling
// General server error handling
app.use(errorHandler);

export default app;

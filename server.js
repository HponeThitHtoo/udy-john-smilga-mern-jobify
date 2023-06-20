// import cors from "cors";
import express from "express";
import dotenv from "dotenv";
// for try/catch in controllers
import "express-async-errors";
// for logging
import morgan from "morgan";

// db and authenticateUser
import connectDB from "./db/connect.js";
// routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";
// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

// for deployment
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// for security
import helmet from "helmet"; // secure header
import xss from "xss-clean"; // sanitize inputs to prevent cross-site scripting attacks
import mongoSanitize from "express-mongo-sanitize"; // sanitize for mongodb operator injection

// for cookies
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// for cors error
// app.use(cors());

// for logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// for deployment
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

// for body parsing json data
app.use(express.json());

// for cookies
app.use(cookieParser());

// for security
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome!" });
});

app.get("/api/v1", (req, res) => {
  res.json({ msg: "API" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

// only when ready to deploy
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening on ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

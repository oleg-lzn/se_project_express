require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const mainRouter = require("./routes/index");
const { DB_URL } = require("./utils/config");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const PORT = process.env.PORT || 3001;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`connected to the database`);
  })
  .catch((err) => {
    console.error(err);
  });

const allowedOrigins = [
  "http://localhost:3000",
  "https://se-project-react-two.vercel.app",
  "https://se-project-react-git-main-olegs-projects-829acb4f.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// the request logger

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use("/", mainRouter);

// the error logger
app.use(errorLogger);

// celebrate error handler
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

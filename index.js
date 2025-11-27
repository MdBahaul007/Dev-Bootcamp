import express from "express";
import dotenv from "dotenv";
import path from "path";
import router from "./routes/routes.js";
import dbConnection from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config({ path: path.resolve("./config/config.env") });

const app = express();
const PORT = process.env.PORT || 5000;

//making DB Connection
dbConnection();

// Middleware
app.use(express.json());

//Mounting routers - more scalable approach
app.use("/api/v1/bootcamp", router);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(
    `Listing to PORT No = ${PORT} in environment ${process.env.NODE_ENV}`
  );
});

//global error handling if any promise in code fails so for ex in db.json we dont need try catch if error comes in mongo db connection it will be handled here.
process.on("unhandledRejection", (error, promise) => {
  console.log(`Error : ${error.message}`);
  server.close(() => process.exit(1));
});

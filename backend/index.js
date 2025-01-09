import express from "express";
// import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To Book Store");
});

app.use("/books", booksRoute);

mongoose
  .connect(`${process.env.mongoDBURL}`)
  .then(() => {
    console.log("App connected to database");
    const port = process.env.PORT || 5555;
    app.listen(port, () => {
      console.log(`App is listening to port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

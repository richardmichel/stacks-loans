import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

// Controllers
import apiController from "./User/api";

// Express Application
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Mongoose Connection
try {
  const database_url = "mongodb://localhost:27017";
  mongoose.connect(database_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "stack-loan",
  });
  console.log("[MongoDB]database.ts Succesfully connected to database");
} catch (error) {
  console.log("[MongoDB]database.ts Cannot connect to database.");
}
// Routes
app.use("/stackloan", apiController);
// Listening port
app.listen(3000);

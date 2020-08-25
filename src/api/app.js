import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
// Controllers
import apiUser from "./User/api";
import apiContract from "./Contract/api";

// Express Application
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors({ origin: true, credentials: true }));

// Allow http://localhost:3000 to access this api via websocket.
// https://enable-cors.org/server_expressjs.html
app.use((req, res, next) => {
  //res.header('Access-Control-Allow-Credentials', true)
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Mongoose Connection
try {
  const database_url =
    "mongodb+srv://mongoadmin:s3cr3t@cluster0.8yefw.gcp.mongodb.net/stack-loan?retryWrites=true&w=majority";
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
app.use("/stackloan", apiUser);
app.use("/stackloan", apiContract);

// Listening port
app.listen(4000);

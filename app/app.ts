import express from "express";
import path from "path";
import favicon from "serve-favicon";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import routes from "./routes";
import config from "./bin/config";

/**
 * Mongoose COnnection breakdown
 */
let dbname: string = config.db; //get the mongoose db values from config
mongoose.connect(dbname, { useNewUrlParser: true }); //connect to the database
mongoose.Promise = global.Promise; //get mongoose to use the global library
let db: mongoose.Connection = mongoose.connection; //Get the default connection
db.on("error", console.error.bind(console, "MongoDB connection error:")); //Bind connection to error event (to get notification of connection errors)

let app: express.Application = express();

// view engine setup
app.set("views", path.join(__dirname, "/../views"));
app.set("view engine", "jade");

app.use(favicon(path.join(__dirname, "/../public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/", routes.base);
app.use("/post", routes.post);

// using arrow syntax
app.use((req, res, next) => {
  let err: any = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use((err: any, req: any, res: any, next: any) => {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

export default app;

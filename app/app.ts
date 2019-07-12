import express, { Request, Response, NextFunction } from "express";
import path from "path";
import favicon from "serve-favicon";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import dotenv from 'dotenv';

/**
 * Config Env
 */
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}


import routes from "./routes";
import passportConfig from "./config/passport";

/**
 * Mongoose COnnection breakdown
 */
let dbname: any = process.env.DB //get the mongoose db values from config
mongoose.connect(dbname, { useNewUrlParser: true }); //connect to the database
mongoose.Promise = global.Promise; //get mongoose to use the global library
let db: mongoose.Connection = mongoose.connection; //Get the default connection
db.on("error", console.error.bind(console, "MongoDB connection error:")); //Bind connection to error event (to get notification of connection errors)

let app: express.Application = express();

// view engine setup
app.set("views", path.join(__dirname, "/../views"));
app.set("view engine", "jade");

//Express Configuration
app.use(favicon(path.join(__dirname, "/../public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
//Initialize passport
app.use(passport.initialize());
//passport Config
passportConfig(passport);

//Routes
let keys: Array<string> = Object.keys(routes);
let ver: String = '/api/v1/'
keys.forEach(k => {
  if (k !== "base")
    app.use(`${ver}${k}`, routes[k])
  else
    app.use(`${ver}`, routes[k])

})

// using arrow syntax
app.use((req: Request, res: Response, next: NextFunction) => {
  let err: any = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

export default app;

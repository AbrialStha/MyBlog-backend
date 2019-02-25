import express from "express";
import path from "path";

const app: express.Application = express();
const port: Number = 8088; //default port to listen

app.get("/", function(req, res) {
  res.send("Hello Worlddd!");
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

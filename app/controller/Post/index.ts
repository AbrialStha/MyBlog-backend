import { Request, Response, NextFunction } from "express";

class Post {
  create = (req: Request, res: Response, nxt: NextFunction) => {
    //Do create Function here
    res.status(200).send("Post Created");
  };
}

export default new Post();

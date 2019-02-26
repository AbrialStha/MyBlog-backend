class Post {
  create = (req: any, res: any, nxt: any) => {
    //Do create Function here
    res.status(200).send("Post Created");
  };
}

export default new Post();

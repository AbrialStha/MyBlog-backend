import { Router } from "express";
import Post from "../controller/Post";

const router: Router = Router();

//@route    GET api/post/test
//@desc     Tests post route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Post work" }));

router.get("/create", Post.create);

export default router;

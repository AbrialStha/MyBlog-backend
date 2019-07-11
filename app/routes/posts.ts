import { Router } from "express";
import passport from "passport";
import Post from "../controller/Post";

const router: Router = Router();

//@route    GET api/posts/test
//@desc     Tests post route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Post work" }));

//@route    GET api/posts/ptest
//@desc     Tests protected post route
//@access   Private
router.get(
  "/ptest",
  passport.authenticate("jwt", { session: false }),
  (req, res) => res.json({ msg: "Protected Post work", user: req.user.name })
);

//@route    GET api/posts/
//@desc     Get Post Created by user
//@access   Private
router.get("/", passport.authenticate("jwt", { session: false }), Post.get)

//@route    POST api/posts/create
//@desc     Create a new post
//@access   Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  Post.create
);

export default router;

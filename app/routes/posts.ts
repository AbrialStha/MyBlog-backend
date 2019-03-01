import { Router } from "express";
import passport from "passport";
import Post from "../controller/Post";

const router: Router = Router();

//@route    GET api/post/test
//@desc     Tests post route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Post work" }));

//@route    GET api/post/ptest
//@desc     Tests protected post route
//@access   Private
router.get(
  "/ptest",
  passport.authenticate("jwt", { session: false }),
  (req, res) => res.json({ msg: "Protected Post work", user: req.user.name })
);

//@route    POST api/post/create
//@desc     Tests protected post route
//@access   Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  Post.create
);

export default router;

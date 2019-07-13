import { Router } from "express";
import passport from "passport";
import Category from "../controller/Category";

const router: Router = Router();

//@route    GET /categories/test
//@desc     Tests post route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Categories work" }));

//@route    POST /categories/add
//@desc     Add a new Category
//@access   Private
router.post("/add", passport.authenticate("jwt", { session: false }), Category.create);

//@route    POST /categories/get
//@desc     Get all categories owned by user
//@access   Private
router.get("/get", passport.authenticate("jwt", { session: false }), Category.get);

//@route    POST /categories/:id
//@desc     delete a category owned by user
//@access   Private
router.delete("/:id", passport.authenticate("jwt", { session: false }), Category.delete);

export default router;

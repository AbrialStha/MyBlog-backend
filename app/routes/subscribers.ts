import { Router } from "express";
import passport from "passport";
import Subscriber from "../controller/Subscriber";

const router: Router = Router();

//@route    GET /subscribers/test
//@desc     Tests post route
//@access   Public
router.get("/test", (req, res) => res.json({ msg: "Categories work" }));

//@route    POST /subscribers/:id/subscribe
//@desc     Add a new Category
//@access   Public
router.post("/:id/subscribe", Subscriber.subscribe);

//@route    POST /subscribers/get
//@desc     Get all categories owned by user
//@access   Private
router.get("/get", passport.authenticate("jwt", { session: false }), Subscriber.get);

//@route    POST /subscribers/unsubscribe/:id
//@desc     delete a category owned by user
//@access   Public
router.patch("/unsubscribe/:id", Subscriber.unsubscribe);

export default router;

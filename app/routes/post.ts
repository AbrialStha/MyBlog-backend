import { Router } from "express";
import Post from "../controller/Post";

const router: Router = Router();

router.get("/create", Post.create);

export default router;

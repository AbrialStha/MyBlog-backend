import { Router } from "express";

const router: Router = Router();

router.get("/", function(req: any, res: any) {
  res.send("Hello Worlddd!");
});

export default router;
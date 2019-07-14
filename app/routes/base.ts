import { Router } from "express";

const router: Router = Router();

router.get("/", function (req: any, res: any) {
  res.send(`Blog Backend Running in env: ${process.env.NODE_ENV}`);
});

export default router;
import { Router } from "express";
import { postBank } from "../ctr/duration.ctr.js";

const router = Router();

router.post("/post", postBank);

export default router;

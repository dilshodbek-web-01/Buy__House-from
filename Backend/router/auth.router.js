import { Router } from "express";
import { createUser } from "../ctr/auth.ctr.js";

const router = Router();


router.post("/create", createUser);


export default router;


import { Router } from "express";
import {
  getComplex,
  getOneComplex,
  createComplex,
  deleteComplex,
  updateComplex,
} from "../ctr/complex.crt.js";

const router = Router();

router.get("/read", getComplex);
router.get("/read/:id", getOneComplex);
router.post("/create", createComplex);
router.delete("/delete/:complex_id", deleteComplex);
router.put("/update/:complex_id", updateComplex);

export default router;

import { Router } from "express";
import companyValidate from "../middleware/companies.middleware.js";
import {
  getCompanies,
  createCompany,
  deleteCompany,
  updateCompany,
} from "../ctr/companies.ctr.js";

const router = Router();

router.get("/read", getCompanies);
router.post("/create", companyValidate, createCompany);
router.delete("/delete/:company_id", deleteCompany);
router.put("/update/:company_id", updateCompany);

export default router;

import { Express, Router } from "express";
import {
  createNewCompany,
  deleteCompanyById,
  getCompany,
  getCompanyById,
  updateCompanyById,
} from "../controllers/compañias.controller";

const router = Router();

router.get("/company", getCompany);
router.post("/company", createNewCompany);
router.delete("/company/:id", deleteCompanyById);
router.put("/company/:id", updateCompanyById);
//get by id
router.get("/company/:id", getCompanyById);

export default router;

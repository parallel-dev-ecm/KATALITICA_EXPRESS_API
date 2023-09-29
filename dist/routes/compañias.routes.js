"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compa_ias_controller_1 = require("../controllers/compa\u00F1ias.controller");
const router = (0, express_1.Router)();
router.get("/company", compa_ias_controller_1.getCompany);
router.post("/company", compa_ias_controller_1.createNewCompany);
router.delete("/company/:id", compa_ias_controller_1.deleteCompanyById);
router.put("/company/:id", compa_ias_controller_1.updateCompanyById);
//get by id
router.get("/company/:id", compa_ias_controller_1.getCompanyById);
exports.default = router;

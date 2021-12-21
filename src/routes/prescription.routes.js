const express = require("express");
const router = express.Router();

const crudController = require("../controllers/Crud");
const Prescription = require("../models/prescription.model")();

const prescriptionCrudController = new crudController(Prescription);

// get all prescriptions
router.get("/prescriptions", prescriptionCrudController.getAll);

// create prescription
router.post("/prescriptions", prescriptionCrudController.create);

// remove a prescription
router.delete("/prescriptions/:id", prescriptionCrudController.delete);

module.exports = router;

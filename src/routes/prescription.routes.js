const express = require("express");
const router = express.Router();

const crudController = require("../controllers/Crud");
const Prescription = require("../models/prescription.model")();

const prescriptionCrudController = new crudController(Prescription);

// get all users
router.get("/prescriptions", prescriptionCrudController.getAll);

// create user
router.post("/prescriptions", prescriptionCrudController.create);

// remove a user
router.delete("/prescriptions/:id", prescriptionCrudController.delete);

module.exports = router;

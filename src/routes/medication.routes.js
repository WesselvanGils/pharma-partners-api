const express = require("express");
const router = express.Router();
const crudController = require("../controllers/Crud");
const Medication = require("../models/medication.model")();
const medicationCrudController = new crudController(Medication);

// get all medications
router.get("/medications", medicationCrudController.getAll);

// create a medication
router.post("/medications", medicationCrudController.create);

// remove a medication
router.delete("/medications/:id", medicationCrudController.delete);

module.exports = router;

const express = require("express");
const router = express.Router();
const crudController = require("../controllers/Crud");
const Patient = require("../models/patient.model")();
const patientCrudController = new crudController(Patient);

// get all patients
router.get("/patients", patientCrudController.getAll);

// create a patient
router.post("/patients", patientCrudController.create);

// get a patient
router.get("/patients/:id", patientCrudController.getOne);

// update a patient
router.put("/patients/:id", patientCrudController.update);

// remove a petient
router.delete("/patients/:id", patientCrudController.delete);

module.exports = router;

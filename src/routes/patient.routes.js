const express = require("express");
const router = express.Router();

const crudController = require("../controllers/Crud");
const Patient = require("../models/patient.model")();

const patientCrudController = new crudController(Patient);

// get all users
router.get("/patients", patientCrudController.getAll);

// create user
router.post("/patients", patientCrudController.create);

// get a user
router.get("/patients/:id", patientCrudController.getOne);

// get a edit
router.put("/patients/:id", patientCrudController.update);

// remove a user
router.delete("/patients/:id", patientCrudController.delete);

module.exports = router;

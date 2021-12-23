const express = require("express");
const router = express.Router();

const crudController = require("../controllers/Crud");
const Medication = require("../models/medication.model")();

const medicationCrudController = new crudController(Medication);

// get all users
router.get("/medications", medicationCrudController.getAll);

// create medication
router.post("/medications", medicationCrudController.create);

// remove a user
router.delete("/medications/:id", medicationCrudController.delete);

module.exports = router;

const express = require("express");
const router = express.Router();

const crudController = require("../controllers/Crud");
const Measurement = require("../models/measurement.model")();

const measurementCrudController = new crudController(Measurement);

// get all users
router.get("/measurements", measurementCrudController.getAll);

// create user
router.post("/measurements", measurementCrudController.create);

// remove a user
router.delete("/measurements/:id", measurementCrudController.delete);

module.exports = router;
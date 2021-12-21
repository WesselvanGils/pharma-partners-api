const express = require("express");
const router = express.Router();

const crudController = require("../controllers/Crud");
const medicalRecord = require("../models/medicalRecord.model")();

const medicalRecordCrudController = new crudController(medicalRecord);

//Update medicalrecord
router.get("/medicalrecords/:id", medicalRecordCrudController.update);


module.exports = router;
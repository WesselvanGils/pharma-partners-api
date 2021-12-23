const express = require("express");
const router = express.Router();

const crudController = require("../controllers/Crud");
const Diagnostic = require("../models/diagnostic.model")();

const diagnosticCrudController = new crudController(Diagnostic);

// get all users
router.get("/diagnostics", diagnosticCrudController.getAll);

// create user
router.post("/diagnostics", diagnosticCrudController.create);

// remove a user
router.delete("/diagnostics/:id", diagnosticCrudController.delete);

//Update diagnostic
router.put("/diagnostics/:id", diagnosticCrudController.update);

module.exports = router;
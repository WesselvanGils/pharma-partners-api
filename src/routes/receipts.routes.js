const express = require("express");
const router = express.Router();

const crudController = require("../controllers/Crud");
const Receipts = require("../models/receipt.model")();

const receiptCrudController = new crudController(Receipts);

// get all users
router.get("/receipts", receiptCrudController.getAll);

// create user
router.post("/receipts", receiptCrudController.create);

// remove a user
router.delete("/receipts/:id", receiptCrudController.delete);

module.exports = router;

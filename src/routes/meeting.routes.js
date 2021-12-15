const express = require("express");
const router = express.Router();

const crudController = require("../controllers/Crud");
const Meeting = require("../models/meeting.model")();

const meetingCrudController = new crudController(Meeting);

// get all users
router.get("/meetings", meetingCrudController.getAll);

// create user
router.post("/meetings", meetingCrudController.create);

// get a user
router.get("/meetings/:id", meetingCrudController.getOne);

// get a edit
router.put("/meetings/:id", meetingCrudController.update);

// remove a user
router.delete("/meetings/:id", meetingCrudController.delete);

module.exports = router;

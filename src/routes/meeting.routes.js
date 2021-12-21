const express = require("express");
const router = express.Router();
const crudController = require("../controllers/Crud");
const MeetingController = require("../controllers/meeting.controller");
const Meeting = require("../models/meeting.model")();
const meetingCrudController = new crudController(Meeting);
const meetingController = new MeetingController(Meeting);

// get all meetings
router.get("/meetings/:id", meetingController.getAll);

// create a meeting
router.post("/meetings", meetingCrudController.create);

// get a meeting
router.get("/meetings/:id", meetingCrudController.getOne);

// update a meeting
router.put("/meetings/:id", meetingCrudController.update);

// remove a meeting
router.delete("/meetings/:id", meetingCrudController.delete);

module.exports = router;

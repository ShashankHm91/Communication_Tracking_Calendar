const express = require("express");
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/Events");

router.post("/createEvent", createEvent);
router.get("/getAllEvents", getAllEvents);
router.put("/updateEvent/:id", updateEvent);
// router.put("/updateEvents", updateEvents);
router.delete("/deleteEvent/:id", deleteEvent);

module.exports = router;

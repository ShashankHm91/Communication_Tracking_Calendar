const Event = require("../models/Events");
const { validationResult } = require("express-validator"); // Ensure this is used for request validation

// Create a new event
exports.createEvent = async (req, res) => {
  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const events = Array.isArray(req.body) ? req.body : [req.body];

  try {
    // Validate each event's fields before processing
    for (const event of events) {
      const { 
        date, companyName, meetingGoal, location, linkedinProfile, 
        emails, phoneNumbers,communicationMethod, comments, communicationPeriodicity 
      } = event;

      if (!date|| !companyName || !meetingGoal || !location || !emails || !communicationMethod || !communicationPeriodicity) {
        return res.status(400).json({ error: "Missing required fields in one or more events." });
      }

      if (!emails.every(email => /.+\@.+\..+/.test(email))) {
        return res.status(400).json({ error: "Invalid email format in one or more events." });
      }

      if (phoneNumbers && !phoneNumbers.every(phone => /\+?[1-9]\d{1,14}$/.test(phone))) {
        return res.status(400).json({ error: "Invalid phone number format in one or more events." });
      }
    }

    // Create and save events
    const createdEvents = await Event.insertMany(events);
    res.status(201).json({ message: "Events created successfully", events: createdEvents });
  } catch (error) {
    console.error("Error creating events:", error.message);
    res.status(500).json({ error: "Server error: " + error.message });
  }
};


// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const {
    date,
    companyName,
    meetingGoal,
    location,
    linkedinProfile,
    emails,
    phoneNumbers,
    communicationMethod,
    communicationStatus,
    comments,
    communicationPeriodicity,
  } = req.body;

  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Find and update the event
    const event = await Event.findByIdAndUpdate(
      id,
      {
        date,
        companyName,
        meetingGoal,
        location,
        linkedinProfile,
        emails,
        phoneNumbers,
        communicationMethod,
        communicationStatus,
        comments,
        communicationPeriodicity,
      },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event updated successfully.", event });
  } catch (error) {
    console.error("Error updating event:", error.message);
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

exports.updateEvents = async (req, res) => {
  const events = req.body; // Expecting an array of events

  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Iterate over each event and update it
    const updatedEvents = [];
    
    for (const event of events) {
      const {
        id,
        date,
        companyName,
        meetingGoal,
        location,
        linkedinProfile,
        emails,
        phoneNumbers,
        communicationMethod,
        communicationStatus,
        comments,
        communicationPeriodicity,
      } = event;

      // Find and update each event
      const updatedEvent = await Event.findByIdAndUpdate(
        id,
        {
          date,
          companyName,
          meetingGoal,
          location,
          linkedinProfile,
          emails,
          phoneNumbers,
          communicationMethod,
          communicationStatus,
          comments,
          communicationPeriodicity,
        },
        { new: true }
      );

      if (!updatedEvent) {
        return res.status(404).json({ message: `Event with ID ${id} not found` });
      }

      updatedEvents.push(updatedEvent);
    }

    // Respond with the updated events
    res.json({ message: "Events updated successfully.", events: updatedEvents });
  } catch (error) {
    console.error("Error updating events:", error.message);
    res.status(500).json({ error: "Server error: " + error.message });
  }
};


// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted successfully." });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

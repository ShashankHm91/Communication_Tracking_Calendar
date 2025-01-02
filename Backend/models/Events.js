const mongoose = require("mongoose");

// Define the Event schema
const eventSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    companyName: { type: String, required: true },
    meetingGoal: { type: String, required: true },
    location: { type: String, required: true },
    linkedinProfile: { type: String, required: false }, // Optional LinkedIn profile
    emails: { 
      type: [String], 
      required: true, 
      validate: {
        validator: function (value) {
          return value.every(email => /.+\@.+\..+/.test(email));
        },
        message: "Invalid email format."
      } 
    }, // Array of email strings with validation
    phoneNumbers: { 
      type: [String], 
      required: false, 
      validate: {
        validator: function (value) {
          return value.every(phone => /\+?[1-9]\d{1,14}$/.test(phone));
        },
        message: "Invalid phone number format."
      } 
    }, // Array of phone numbers
    communicationMethod: { type: String, required: false }, 
    comments: { type: String, required: false }, 
    communicationPeriodicity: { type: String, required: true },
    communicationStatus: { type: String, required: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual 'id' for easier object representation
eventSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Export the model
module.exports = mongoose.model("Event", eventSchema);

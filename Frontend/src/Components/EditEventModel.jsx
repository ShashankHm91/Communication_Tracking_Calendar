import React, { useState, useEffect } from "react";

const EditEventModal = ({ event, onSubmit, closeModal }) => {
  const [editedEvent, setEditedEvent] = useState({});

  useEffect(() => {
    setEditedEvent(event || {});
  }, [event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the input is for emails or phone numbers, split by commas
    if (name === "emails" || name === "phoneNumbers") {
      const updatedValue = value.split(",").map((item) => item.trim());
      setEditedEvent((prev) => ({
        ...prev,
        [name]: updatedValue,
      }));
    } else {
      setEditedEvent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedEvent);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().slice(0, 16);
  };

  if (!editedEvent) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-3xl w-11/12 max-w-4xl max-h-[90vh] overflow-auto shadow-2xl backdrop-blur-lg animate-slide-in">
        <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-xl font-medium text-gray-800">Edit Event</h3>
          <button
            className="text-2xl text-gray-500 hover:text-red-600 transition-transform transform hover:rotate-90"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Company Name */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={editedEvent.companyName || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                placeholder="Enter Company Name"
              />
            </div>

            {/* Meeting Goal */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">Meeting Goal</label>
              <input
                type="text"
                name="meetingGoal"
                value={editedEvent.meetingGoal || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                placeholder="Enter Meeting Goal"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={editedEvent.location || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                placeholder="Enter Location"
              />
            </div>

            {/* LinkedIn Profile */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">LinkedIn Profile</label>
              <input
                type="text"
                name="linkedinProfile"
                value={editedEvent.linkedinProfile || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                placeholder="Enter LinkedIn Profile"
              />
            </div>

            {/* Emails */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">Emails</label>
              <input
                type="text"
                name="emails"
                value={editedEvent.emails ? editedEvent.emails.join(", ") : ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                placeholder="Enter Emails (comma separated)"
              />
            </div>

            {/* Phone Numbers */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">Phone Numbers</label>
              <input
                type="text"
                name="phoneNumbers"
                value={editedEvent.phoneNumbers ? editedEvent.phoneNumbers.join(", ") : ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                placeholder="Enter Phone Numbers (comma separated)"
              />
            </div>

            {/* Communication Method */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">Communication Method</label>
              <select
                name="communicationMethod"
                value={editedEvent.communicationMethod || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
              >
                <option value="">Select</option>
                <option value="LinkedIn Post">LinkedIn Post</option>
                <option value="LinkedIn Message">LinkedIn Message</option>
                <option value="Email">Email</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Communication Status */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">Communication Status</label>
              <select
                name="communicationStatus"
                value={editedEvent.communicationStatus || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
              >
                <option value="">Select</option>
                <option value="Overdue">Overdue</option>
                <option value="Due Today">Due Today</option>
                <option value="Upcoming">Upcoming</option>
              </select>
            </div>

            {/* Comments */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">Comments</label>
              <textarea
                name="comments"
                value={editedEvent.comments || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                placeholder="Enter Comments"
                rows="3"
              ></textarea>
            </div>

            {/* Communication Periodicity */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">Communication Periodicity</label>
              <input
                type="text"
                name="communicationPeriodicity"
                value={editedEvent.communicationPeriodicity || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                placeholder="e.g., every 3 weeks"
              />
            </div>

            {/* Start Date */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm mb-1">Start Date</label>
              <input
                type="datetime-local"
                name="date"
                value={formatDate(editedEvent.date)}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-1.5 bg-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-300 hover:text-gray-800 transition transform hover:scale-105 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition transform hover:scale-105 text-xs"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;


import React, { useState, useEffect } from "react";

const StatusModel = ({ events, onSubmit, closeModal }) => {
  const [statusEvents, setStatusEvents] = useState([]);

  useEffect(() => {
    setStatusEvents(events || []); // Initialize with array of events
  }, [events]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    setStatusEvents((prev) =>
      prev.map((event, i) =>
        i === index ? { ...event, [name]: value } : event
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(statusEvents); // Pass updated statuses for all companies
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-3xl w-11/12 max-w-4xl max-h-[90vh] overflow-auto shadow-2xl backdrop-blur-lg animate-slide-in">
        <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-xl font-medium text-gray-800">Update Statuses</h3>
          <button
            className="text-2xl text-gray-500 hover:text-red-600 transition-transform transform hover:rotate-90"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {statusEvents.map((event, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 border-b border-gray-300 pb-4"
            >
              {/* Company Name */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold text-sm mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={event.companyName || ""}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                  placeholder="Enter Company Name"
                  disabled
                />
              </div>

              {/* Communication Status */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold text-sm mb-1">
                  Communication Status
                </label>
                <select
                  name="communicationStatus"
                  value={event.communicationStatus || ""}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                >
                  <option value="">Select</option>
                  <option value="Overdue">Overdue</option>
                  <option value="Due Today">Due Today</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>
            </div>
          ))}

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

export default StatusModel;

import moment from 'moment';
import React, { useEffect, useState } from 'react';

const LogCommunicationModel = ({ events, onSubmit, closeModal }) => {
    const [editedEvents, setEditedEvents] = useState([]);

    useEffect(() => {
        setEditedEvents(events || []); // Initialize with events data on mount or events change
    }, [events]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        setEditedEvents((prev) => {
            const updatedEvents = [...prev];
            updatedEvents[index] = {
                ...updatedEvents[index],
                [name]: value,
            };
            return updatedEvents;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check for missing or invalid dates before submitting
        const invalidEvent = editedEvents.find(event => !event.date || isNaN(new Date(event.date)));
        if (invalidEvent) {
            console.error("Error: Some events have missing or invalid dates.");
            return;
        }

        // Proceed with valid events
        onSubmit(editedEvents);
    };


    const formatDate = (date) => {       
        return date ? new Date(date).toISOString().slice(0, 16) : "";
    };


    if (!editedEvents.length) return null; // Prevent rendering if no events are present

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50 animate-fade-in">
            <div className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-3xl w-11/12 max-w-4xl max-h-[90vh] overflow-auto shadow-2xl backdrop-blur-lg animate-slide-in">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-4">
                    <h3 className="text-xl font-medium text-gray-800">Edit Events</h3>
                    <button
                        className="text-2xl text-gray-500 hover:text-red-600 transition-transform transform hover:rotate-90"
                        onClick={closeModal}
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {editedEvents.map((event, index) => (
                            <div key={index}>
                                <h4 className="text-lg font-medium mb-4">{event.companyName}</h4>

                                {/* Company Name */}
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-semibold text-sm mb-1">Company Name</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={event.companyName || ""}
                                        onChange={(e) => handleInputChange(e, index)}
                                        readOnly
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                                    />
                                </div>

                                {/* Meeting Goal */}
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-semibold text-sm mb-1">Meeting Goal</label>
                                    <input
                                        type="text"
                                        name="meetingGoal"
                                        value={event.meetingGoal || ""}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                                    />
                                </div>

                                {/* Location */}
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-semibold text-sm mb-1">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={event.location || ""}
                                        onChange={(e) => handleInputChange(e, index)}
                                        readOnly
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                                    />
                                </div>

                                {/* LinkedIn Profile */}
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-semibold text-sm mb-1">LinkedIn Profile</label>
                                    <input
                                        type="text"
                                        name="linkedinProfile"
                                        value={event.linkedinProfile || ""}
                                        onChange={(e) => handleInputChange(e, index)}
                                        readOnly
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                                    />
                                </div>

                                {/* Email */}
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-semibold text-sm mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="emails"
                                        value={event.emails || ""}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                                    />
                                </div>

                                {/* Phone Numbers */}
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-semibold text-sm mb-1">Phone Numbers</label>
                                    <input
                                        type="text"
                                        name="phoneNumbers"
                                        value={event.phoneNumbers || ""}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                                    />
                                </div>

                                {/* Communication Method */}
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-semibold text-sm mb-1">Communication Method</label>
                                    <select
                                        name="communicationMethod"
                                        value={event.communicationMethod || ""}
                                        onChange={(e) => handleInputChange(e, index)}
                                        disabled
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
                                        value={event.communicationStatus || ""}
                                        onChange={(e) => handleInputChange(e, index)}
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
                                        value={event.comments || ""}
                                        onChange={(e) => handleInputChange(e, index)}
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
                                        value={event.communicationPeriodicity || ""}
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                                        placeholder="e.g., every 3 weeks"
                                    />
                                </div>

                                {/* Date */}
                                <div className="flex flex-col">
                                    <label className="text-gray-700 font-semibold text-sm mb-1">Date</label>
                                    <input
                                        type="datetime-local"
                                        name="date"
                                        value={formatDate(event.date || '')}  // Ensure it's in "YYYY-MM-DDTHH:MM" format
                                        onChange={(e) => handleInputChange(e, index)}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                                        min={new Date().toISOString().slice(0, 16)}  // Set minimum date and time
                                    />
                                   
                                   {/*

                                    <input
                                        type="datetime-local"
                                        name="date"
                                        value={formatToDisplay(newEvent.date)}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
                                        min={new Date().toISOString().slice(0, 16)}
                                    />
                                   */}
                                </div>
                            </div>
                        ))}

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
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LogCommunicationModel;

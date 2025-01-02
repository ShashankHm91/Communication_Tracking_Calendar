// EventList Component
import React from "react";
import moment from "moment";
import {
  FaBriefcase, FaMapMarkerAlt, FaLink, FaEnvelope, FaPhone, FaBuilding, FaHourglassStart,
  FaHourglassEnd
} from "react-icons/fa";

const EventList = ({ events, openEditModal, onDelete }) => {
  const upcomingEvents = events
    .filter(event => moment(event.date).isSame(new Date(), "day"))
    .sort((a, b) => moment(a.date).diff(moment(b.date)));

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 shadow-md w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-1">
        Today's Events - {upcomingEvents.length}
      </h2>
      <ul className="list-none p-0 m-0 h-[200px] overflow-y-auto w-full">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <li
              key={event.id}
              className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-2 mb-2 rounded-lg border-l-4 border-indigo-500 hover:bg-indigo-200 hover:border-indigo-600 hover:shadow-sm transition-all duration-300 w-full"
            >
              <div className="space-y-2">
                <p className="text-gray-800 text-sm font-semibold flex items-center">
                  <FaBuilding className="w-4 h-4 text-indigo-600 mr-2" />
                  <strong>{event.companyName || "N/A"}</strong>
                </p>
                <div className="flex items-center text-gray-600 text-xs">
                  <FaBriefcase className="w-4 h-4 text-indigo-600 mr-1" />
                  <span>{event.meetingGoal || "N/A"}</span>
                </div>
                <div className="flex items-center text-gray-600 text-xs">
                  <FaMapMarkerAlt className="w-4 h-4 text-green-600 mr-1" />
                  <span>{event.location || "N/A"}</span>
                </div>
                <div className="flex items-center text-gray-600 text-xs">
                  <FaLink className="w-4 h-4 text-blue-600 mr-1" />
                  <a
                    href={event.linkedinProfile || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-800"
                  >
                    {event.linkedinProfile || "N/A"}
                  </a>
                </div>
                <div className="flex items-center text-gray-600 text-xs">
                  <FaEnvelope className="w-4 h-4 text-red-600 mr-1" />
                  <span>{event.emails || "N/A"}</span>
                </div>
                <div className="flex items-center text-gray-600 text-xs">
                  <FaPhone className="w-4 h-4 text-yellow-600 mr-1" />
                  <span>{event.phoneNumbers || "N/A"}</span>
                </div>
                <div className="flex items-center text-gray-600 text-xs">
                  < FaHourglassStart className="w-4 h-4 text-yellow-600 mr-1" />
                  {moment(event.date).format("MMM D, h:mm A") || "N/A"}
                </div>
                
                <div className="space-x-1 mt-2">
                  <button
                    onClick={() => openEditModal(event)}
                    className="px-2 py-1 text-xs bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(event)}
                    className="px-2 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500 italic py-4 w-full">
            No events found!
          </li>
        )}
      </ul>
    </div>
  );
};

export default EventList;
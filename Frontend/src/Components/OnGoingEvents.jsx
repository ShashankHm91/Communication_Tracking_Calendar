import React from "react";
import moment from "moment";
import {
    FaBriefcase,
    FaMapMarkerAlt,
    FaLink,
    FaEnvelope,
    FaPhone,
    FaBuilding,
    FaLinkedin,
    FaCommentsDollar,
    FaCalendarCheck,
    FaHourglassStart,
    FaHourglassEnd,
    FaHandshake

} from "react-icons/fa";

const OnGoingEvents = ({ events, openEditModal, onDelete }) => {
    const onGoing = events
        .filter((event) => moment(event.date).isAfter(new Date()))
        .sort((a, b) => moment(a.date).diff(moment(b.date))).slice(0, 2);

    // console.log(onGoing);


    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-300 pb-2">
                Two On-going Events
            </h2>
            <ul className="list-none p-0 m-0 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {onGoing.length > 0 ? (
                    onGoing.map((event) => (
                        <li
                            key={event.id}
                            className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 mb-3 rounded-lg border-l-4 border-indigo-500 hover:bg-indigo-200 hover:border-indigo-600 hover:shadow-md transition-all duration-300"
                        >
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-800 text-sm font-semibold flex items-center">
                                        <FaBuilding className="w-4 h-4 text-indigo-600 mr-2" />
                                        <strong>{event.companyName || "N/A"}</strong>
                                    </p>

                                </div>

                                <div className="flex items-center text-gray-600 text-xs">
                                    <FaBriefcase className="w-4 h-4 text-indigo-600 mr-1" />
                                    <span>{event.meetingGoal || "N/A"}</span>
                                </div>

                                <div className="flex items-center text-gray-600 text-xs">
                                    <FaMapMarkerAlt className="w-4 h-4 text-green-600 mr-1" />
                                    <span>{event.location || "N/A"}</span>
                                </div>

                                <div className="flex items-center text-gray-600 text-xs">
                                    <FaLinkedin className="w-4 h-4 text-blue-600 mr-1" />
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
                                    <FaCalendarCheck className="w-4 h-4 text-yellow-600 mr-1" />
                                    <span>{event.communicationPeriodicity || "N/A"}</span>
                                </div>

                                <div className="flex items-center text-gray-600 text-xs">
                                    <FaCommentsDollar className="w-4 h-4 text-yellow-600 mr-1" />
                                    <span>{event.comments || "N/A"}</span>
                                </div>

                                <div className="flex items-center text-gray-600 text-xs">
                                    <FaHandshake className="w-4 h-4 text-yellow-600 mr-1" />
                                    <span>{event.communicationMethod || "N/A"}</span>
                                </div>

                                <div className="flex items-center text-gray-600 text-xs">
                                    <FaHourglassStart className="w-4 h-4 text-yellow-600 mr-1" />
                                    {moment(event.date).format("MMM D, h:mm A") || "N/A"}
                                </div>


                            </div>
                        </li>
                    ))
                ) : (
                    <li className="text-center text-gray-500 italic py-4">
                        No events today!
                    </li>
                )}
            </ul>
        </div>
    );
};

export default OnGoingEvents;

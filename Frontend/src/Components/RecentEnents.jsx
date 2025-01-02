import React from 'react'
import moment from "moment";

const RecentEnents = ({ events }) => {

    const doneEvents = events.filter(event =>
        moment(event.date).isBefore(new Date())
    );
    // console.log(doneEvents);
    
    return (
        <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-lg p-4 shadow-lg">

            <div className="mt-4">
                <div className="text-md font-semibold text-gray-800 mb-2">Recent Events - {doneEvents.length}</div>
                <div className="max-h-[300px] overflow-y-auto">
                    {doneEvents.map(event => (
                        <div
                        key={event.id || `${event.date.toISOString()}-${event.name}`}
                            className="flex items-center gap-2 p-3 bg-gradient-to-r from-gray-100 via-white to-gray-50 rounded-lg shadow hover:scale-105 transition-transform duration-300 mb-2"
                        >
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                            <div className="flex-1">
                                <div className="text-gray-800 font-semibold text-sm">{event.companyName}</div>
                                <div className="text-gray-600 text-xs">
                                    {moment(event.date).format("MMM D, h:mm A")}
                                </div>
                            </div>
                           
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RecentEnents
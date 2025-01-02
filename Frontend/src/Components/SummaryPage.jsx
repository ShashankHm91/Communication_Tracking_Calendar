import React from "react";
import moment from "moment";

const SummaryPage = ({ events, openEditModal, onDelete }) => {

  const doneEvents = events.filter(event =>
    moment(event.date).isBefore(new Date())
  );

  const todayEvents = events.filter(event =>
    moment(event.date).isSameOrBefore(new Date(), "day") &&
    moment(event.date).isSame(new Date(), "day")
  );


  const NextEvents = events.filter(event =>
    moment(event.date).isAfter(new Date(), "today"))
    .sort((a, b) => moment(a.date).diff(moment(b.date)));



  return (
    <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4">
        Summary
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-3 rounded-lg text-center shadow-md">
          <div className="text-blue-600 text-2xl font-extrabold mb-1">
            {events.length}
          </div>
          <div className="text-gray-700 text-xs font-medium">Total Events</div>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-green-200 p-3 rounded-lg text-center shadow-md">
          <div className="text-green-600 text-2xl font-extrabold mb-1">
            {doneEvents.length}
          </div>
          <div className="text-gray-700 text-xs font-medium">Done Events</div>
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-3 rounded-lg text-center shadow-md">
          <div className="text-yellow-600 text-2xl font-extrabold mb-1">
            {todayEvents.length}
          </div>
          <div className="text-gray-700 text-xs font-medium">Today's Events</div>
        </div>

        <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-3 rounded-lg text-center shadow-md">
          <div className="text-orange-500 text-2xl font-extrabold mb-1">
            {NextEvents.length}
          </div>
          <div className="text-gray-700 text-xs font-medium">Next Events</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-md font-semibold text-gray-800 mb-2">Next Events</div>
        <div className="max-h-[300px] overflow-y-auto">
          {NextEvents.map(event => (
            <div
              key={event.id}
               className="flex items-center gap-2 p-3 bg-gradient-to-r from-gray-100 via-white to-gray-50 rounded-lg shadow hover:scale-105 transition-transform duration-300 mb-2"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <div className="text-gray-800 font-semibold text-sm">{event.companyName}</div>
                <div className="text-gray-600 text-xs">
                  {moment(event.date).format("MMM D, h:mm A")}
                </div>
              </div>
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
          ))}
        </div>
      </div>
    </div>

  );
};

export default SummaryPage;

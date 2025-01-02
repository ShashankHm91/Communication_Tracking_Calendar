import React, { useEffect, useState } from 'react';
import { fetchEvents, addEvent } from "../../../utils/api";
import moment from "moment";
import LogCommunicationModel from './LogCommunicationModel';
import StatusModel from './StatusModel';
import { Navigate, useNavigate } from 'react-router-dom';
import CalendarComponent from '../../CalendarComponent';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overView");
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [showLog, setShowLog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentCompanies, setCurrentCompanies] = useState([]); // To store selected companies' data
  const [statusChange, setStatusChange] = useState(false);
  const [selectedCompanyData, setSelectedCompanyData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadEvents();
  }, []);

  // signout
  const handleSignOut = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');

    // Redirect to login page
    navigate('/login');
  };

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchEvents();
      const formattedEvents = data.map((event) => ({
        ...event,
        date: new Date(event.date),
      }));
      setUserEvents(formattedEvents);
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommunicationSubmit = async (data) => {
    try {
      const updatedData = data.map((event) => ({
        ...event,
        date: new Date(event.date),
        emails: Array.isArray(event.emails) ? event.emails : [],
        phoneNumbers: Array.isArray(event.phoneNumbers) ? event.phoneNumbers : [],
      }));

      const createdEvent = await addEvent(updatedData);

      setUserEvents((prevEvents) => [
        ...prevEvents,
        ...updatedData.map((event) => ({
          ...event,
          date: new Date(event.date), // Ensure consistent date format
        })),
      ]);

      // Close the modal
      setShowLog(false);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };


  const handleSelectCompany = (companyName) => {
    setSelectedCompanies((prevState) =>
      prevState.includes(companyName)
        ? prevState.filter((name) => name !== companyName)
        : [...prevState, companyName]
    );
  };

  const handleLogCommunication = () => {
    // Remove duplicate companies by mapping to an object and then back to an array
    const selectedCompanyData = userEvents.filter(event =>
      selectedCompanies.includes(event.companyName)
    );

    // Remove duplicate companies by using the companyName as the key
    const uniqueCompanyData = Array.from(new Set(selectedCompanyData.map(a => a.companyName)))
      .map(companyName => {
        return selectedCompanyData.find(event => event.companyName === companyName);
      });

    // Update the state with unique company data
    const companiesData = uniqueCompanyData.map(event => ({
      companyName: event.companyName,
      location: event.location || 'N/A',
      linkedinProfile: event.linkedinProfile || 'N/A',
      emails: Array.isArray(event.emails) ? event.emails : ['N/A'],
      phoneNumbers: Array.isArray(event.phoneNumbers) ? event.phoneNumbers : ['N/A'],
      communicationMethod: event.communicationMethod || 'N/A',
      communicationStatus: event.communicationStatus || 'N/A',
    }));

    setCurrentCompanies(companiesData);
    setShowLog(true);
  };

  const groupedEvents = userEvents.reduce((acc, event) => {
    if (!acc[event.companyName]) acc[event.companyName] = [];
    acc[event.companyName].push(event);
    return acc;
  }, {});

  const processedCompanies = Object.entries(groupedEvents).map(([companyName, events]) => {
    events.sort((a, b) => moment(a.date).diff(moment(b.date)));

    const recentMeeting = [...events]
      .reverse()
      .find(event => moment(event.date).isBefore(new Date()));

    const nextMeeting = events.find(event => moment(event.date).isAfter(new Date()));

    let highlight = "";
    // console.log(nextMeeting);

    // Determine the default highlight based on communicationStatus
    if (nextMeeting && nextMeeting.communicationStatus) {
      const status = nextMeeting.communicationStatus;

      if (status === 'Overdue') {
        highlight = "red"; // Overdue communication
      } else if (status === 'Due Today') {
        highlight = "yellow"; // Communication due today
      }
    }



    return {
      companyName,
      recentMeeting: recentMeeting || null,
      nextMeeting: nextMeeting || null,
      highlight, // Add highlight property
    };
  });




  const handleStatus = () => {
    // Filter selected companies' data based on the selected companies
    const selectedCompanyData = processedCompanies.filter(company =>
      selectedCompanies.includes(company.companyName)
    );
    console.log(selectedCompanyData);
    if (selectedCompanyData.length > 0) {
      setStatusChange(true);
    }
  };

  const updateStatus = (data) => {
    console.log(data);

  }

  const filteredCompanies = searchTerm
    ? processedCompanies.filter(company =>
      company?.companyName?.toLowerCase().includes(searchTerm?.toLowerCase())
    )
    : processedCompanies; // Show all companies if no search term is provided


  return (
    <div>
      <header className="bg-gradient-to-r from-[#4f46e5] to-[#6366f1] p-4 text-white shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center max-w-screen-xl mx-auto">
          {/* Title */}
          <h1 className="m-0 text-lg font-semibold bg-gradient-to-r from-white to-[#e2e8f0] bg-clip-text text-transparent sm:mb-0 mb-2 sm:text-xl text-center sm:text-left">
            Communication Tracking Calendar
          </h1>

          {/* Search Bar */}
          <div className="flex items-center gap-2 max-w-[300px] flex-1 sm:mb-0 mb-2">
            <input
              type="text"
              value={searchTerm || ''}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by company name"
              className="px-3 py-2 rounded-lg border-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4f46e5] w-full sm:max-w-xs"
            />
            <i className="fas fa-search text-[#4f46e5] text-sm"></i>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 sm:mt-0 mt-2">
            <button
              className="bg-white text-[#4f46e5] border-none px-3 py-2 rounded-xl font-medium flex items-center gap-1 cursor-pointer transition-all duration-300 ease-in-out hover:translate-y-[-1px] shadow-sm text-xs"
              onClick={handleLogCommunication}
            >
              <i className="fas fa-plus text-xs"></i> Log communication
            </button>
            <button
              onClick={handleSignOut}
              className="bg-white text-[#4f46e5] border-none px-3 py-2 rounded-xl font-medium flex items-center gap-1 cursor-pointer transition-all duration-300 ease-in-out hover:translate-y-[-1px] shadow-sm text-xs"
            >
              <i className="fas fa-sign-out-alt text-xs"></i> Signout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-3 mt-3 justify-center sm:justify-start">
          <span
            className={`cursor-pointer py-1 px-3 rounded-xl font-medium transition-all duration-300 ease-in-out hover:bg-white hover:text-[#4f46e5] ${activeTab === 'overView' ? 'bg-white text-[#4f46e5] font-semibold shadow-sm' : 'text-[#e2e8f0]'}`}
            onClick={() => setActiveTab('overView')}
          >
            Overview
          </span>
          <span
            className={`cursor-pointer py-1 px-3 rounded-xl font-medium transition-all duration-300 ease-in-out hover:bg-white hover:text-[#4f46e5] ${activeTab === 'calender' ? 'bg-white text-[#4f46e5] font-semibold shadow-sm' : 'text-[#e2e8f0]'}`}
            onClick={() => setActiveTab('calender')}
          >
            Calendar View
          </span>
        </div>
      </header>



      {activeTab === "overView" ? (
        <div className="flex h-screen">
          {/* Today's Events Section */}
          <div className="w-1/4 p-4 bg-gray-100 h-full">
            <h2 className="font-bold text-lg mb-4">
              Today's Events ({userEvents.filter(event => moment(event.date).isSame(new Date(), "day")).length})
            </h2>
            <div className="h-[calc(100vh-8rem)] overflow-y-auto">
              {userEvents.filter(event => moment(event.date).isSame(new Date(), "day")).length > 0 ? (
                userEvents
                  .filter(event => moment(event.date).isSame(new Date(), "day"))
                  .map((event, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg shadow-md mb-3">
                      <p className="font-semibold">{event.companyName}</p>
                      <p className="text-sm text-gray-600">
                        <strong>Time:</strong> {moment(event.date).format("h:mm A")}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Details:</strong> {event.communicationMethod || "N/A"}
                      </p>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500">No events for today.</p>
              )}
            </div>
          </div>


          {/* Main Grid Section */}
          <div className="w-3/4 p-4 bg-white overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Overdue Section */}
              {/* Overdue Section */}
              <div className="h-[calc(100vh-8rem)] overflow-y-auto">
                <h3 className="font-bold text-lg mb-2 text-red-600">
                  Overdue ({filteredCompanies.filter(({ nextMeeting }) => nextMeeting?.communicationStatus === "Overdue").length})
                </h3>
                {filteredCompanies
                  .filter(({ nextMeeting }) => nextMeeting?.communicationStatus === "Overdue")
                  .map(({ companyName, recentMeeting, nextMeeting }) => (
                    <div
                      key={companyName}
                      className="bg-white shadow-md p-4 rounded-lg border bg-red-200 border-red-400 cursor-pointer mb-4"
                      onClick={() => handleSelectCompany(companyName)}
                    >
                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          id={`company-overdue-${companyName}`}
                          checked={selectedCompanies.includes(companyName)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleSelectCompany(companyName);
                          }}
                          className="mr-2 cursor-pointer"
                        />
                        <label htmlFor={`company-overdue-${companyName}`} className="font-semibold text-lg">
                          {companyName}
                        </label>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Recent Meeting:</strong> {recentMeeting ? moment(recentMeeting.date).format("MMM D, h:mm A") : "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Next Meeting:</strong> {nextMeeting ? moment(nextMeeting.date).format("MMM D, h:mm A") : "N/A"}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Due Today Section */}
              <div className="h-[calc(100vh-8rem)] overflow-y-auto">
                <h3 className="font-bold text-lg mb-2 text-yellow-600">
                  Due Today ({filteredCompanies.filter(({ nextMeeting }) => nextMeeting?.communicationStatus === "Due Today").length})
                </h3>
                {filteredCompanies
                  .filter(({ nextMeeting }) => nextMeeting?.communicationStatus === "Due Today")
                  .map(({ companyName, recentMeeting, nextMeeting }) => (
                    <div
                      key={companyName}
                      className="bg-white shadow-md p-4 rounded-lg border bg-yellow-100 border-yellow-400 cursor-pointer mb-4"
                      onClick={() => handleSelectCompany(companyName)}
                    >
                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          id={`company-due-today-${companyName}`}
                          checked={selectedCompanies.includes(companyName)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleSelectCompany(companyName);
                          }}
                          className="mr-2 cursor-pointer"
                        />
                        <label htmlFor={`company-due-today-${companyName}`} className="font-semibold text-lg">
                          {companyName}
                        </label>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Recent Meeting:</strong> {recentMeeting ? moment(recentMeeting.date).format("MMM D, h:mm A") : "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Next Meeting:</strong> {nextMeeting ? moment(nextMeeting.date).format("MMM D, h:mm A") : "N/A"}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Upcoming Section */}
              <div className="h-[calc(100vh-8rem)] overflow-y-auto">
                <h3 className="font-bold text-lg mb-2 text-green-600">
                  Upcoming ({filteredCompanies.filter(({ nextMeeting }) => !["Overdue", "Due Today"].includes(nextMeeting?.communicationStatus)).length})
                </h3>
                {filteredCompanies
                  .filter(({ nextMeeting }) => !["Overdue", "Due Today"].includes(nextMeeting?.communicationStatus))
                  .map(({ companyName, recentMeeting, nextMeeting }) => (
                    <div
                      key={companyName}
                      className="bg-white shadow-md p-4 rounded-lg border bg-green-100 border-green-400 cursor-pointer mb-4"
                      onClick={() => handleSelectCompany(companyName)}
                    >
                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          id={`company-upcoming-${companyName}`}
                          checked={selectedCompanies.includes(companyName)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleSelectCompany(companyName);
                          }}
                          className="mr-2 cursor-pointer"
                        />
                        <label htmlFor={`company-upcoming-${companyName}`} className="font-semibold text-lg">
                          {companyName}
                        </label>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Recent Meeting:</strong> {recentMeeting ? moment(recentMeeting.date).format("MMM D, h:mm A") : "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Next Meeting:</strong> {nextMeeting ? moment(nextMeeting.date).format("MMM D, h:mm A") : "N/A"}
                      </p>
                    </div>
                  ))}
              </div>

            </div>
          </div>
        </div>
      ) : (
        <CalendarComponent events={userEvents} />
      )}




      {showLog && (
        <LogCommunicationModel
          events={currentCompanies} // Pass all selected company events
          closeModal={() => setShowLog(false)}
          onSubmit={handleCommunicationSubmit}
        />
      )}
      {
        statusChange && (
          <StatusModel
            events={selectedCompanyData}
            // onSubmit={updateStatus}  
            closeModal={() => setStatusChange(false)}
          />
        )
      }

    </div>
  );
};

export default UserDashboard;

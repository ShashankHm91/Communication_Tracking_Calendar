import React, { useState, useEffect } from "react";
import CalendarComponent from "../../CalendarComponent";
import EventList from "../../EventList";
import SummaryPage from "../../SummaryPage";
import CreateEventModal from "../../CreateEventModal";
import EditEventModal from "../../EditEventModel";
import { fetchEvents, addEvent, updateEvent, deleteEvent } from "../../../utils/api";
import "./AdminDashboard.css";
import RecentEnents from "../../RecentEnents";
import OnGoingEvents from "../../OnGoingEvents";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // State for the Edit modal
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState({
    companyName: "",
    meetingGoal: "",
    location: "",
    linkedinProfile: "",
    emails: [],  // Ensure emails is an array
    phoneNumbers: "",
    communicationMethod: "",
    date: new Date(),
    communicationStatus: ""
  });

  const [searchQuery, setSearchQuery] = useState("");

  const [editEvent, setEditEvent] = useState(null);
  const [activeTab, setActiveTab] = useState("overView");
  const navigate = useNavigate();

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    console.log(events);

  }, [events]);  // This will run whenever 'events' changes


  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredEvents = events.filter((event) =>
    event.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.meetingGoal.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventDrop = async (movedEvent) => {
    try {
      const updatedEvent = await updateEvent(movedEvent);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === movedEvent.id
            ? {
              ...updatedEvent,
              date: new Date(updatedEvent.date),
            }
            : event
        )
      );
    } catch (error) {
      console.error("Error updating event:", error);
      loadEvents();
    }
  };

  const handleSelectEvent = async (event) => {
    if (window.confirm("Would you like to delete this event?")) {
      try {
        await deleteEvent(event.id);
        setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const openEditModal = (event) => {
    setEditEvent(event); // Set the selected event to the edit state
    setShowEditModal(true); // Open the edit modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "emails") {
      // Convert the comma-separated email string into an array
      const emailsArray = value.split(",").map((email) => email.trim());
      setNewEvent((prev) => ({
        ...prev,
        [name]: emailsArray,
      }));
    } else if (name === "phoneNumbers") {
      // Convert the comma-separated phone number string into an array
      const phoneNumbersArray = value.split(",").map((phone) => phone.trim());
      setNewEvent((prev) => ({
        ...prev,
        [name]: phoneNumbersArray,
      }));
    } else {
      setNewEvent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const handleSubmitNewEvent = async () => {
    try {
      if (
        newEvent.companyName &&
        newEvent.meetingGoal &&
        newEvent.location &&
        newEvent.linkedinProfile &&
        newEvent.emails.length > 0 &&
        newEvent.phoneNumbers.length > 0 && // Ensure phoneNumbers is an array with at least one number
        newEvent.communicationMethod &&
        newEvent.communicationStatus &&
        newEvent.date
      ) {
        const eventToAdd = {
          ...newEvent,
          date: new Date(newEvent.date),
        };

        setEvents((prevEvents) => [
          ...prevEvents,
          {
            ...eventToAdd,
            date: new Date(eventToAdd.date),
          },
        ]);

        const createdEvent = await addEvent(eventToAdd);

        // Append the newly created event to the state correctly
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            ...createdEvent,
            date: new Date(createdEvent.date),
          },
        ]);

        // Reset the form fields after successful creation
        setNewEvent({
          companyName: "",
          meetingGoal: "",
          location: "",
          linkedinProfile: "",
          emails: [],
          phoneNumbers: [],
          communicationMethod: "",
          communicationStatus: "",
          date: new Date(),
        });

        setShowModal(false); // Close the modal after successful event creation
      } else {
        alert("Please fill in all fields.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };



  const handleSubmitEditEvent = async (updatedEvent) => {
    try {
      const eventToUpdate = {
        ...updatedEvent,
        date: new Date(updatedEvent.date),
      };
      console.log("Event to update:", eventToUpdate);  // Ensure the communicationStatus is logged here

      const updated = await updateEvent(eventToUpdate);

      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEvent.id
            ? {
              ...updatedEvent,
              date: new Date(updatedEvent.date),
            }
            : event
        )
      );

      setShowEditModal(false); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };


  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="bg-gradient-to-r from-[#4f46e5] to-[#6366f1] p-2 text-white shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center max-w-screen-xl mx-auto">
          {/* Title */}
          <h1 className="m-0 text-lg font-semibold bg-gradient-to-r from-white to-[#e2e8f0] bg-clip-text text-transparent sm:mb-0 mb-2 sm:text-xl text-center sm:text-left">
            Communication Tracking Calendar
          </h1>

          {/* Search Bar */}
          <div className="flex items-center gap-2 max-w-[300px] flex-1 sm:mb-0 mb-2">
            <input
              type="text"
              className="px-3 py-2 rounded-xl text-black w-full focus:outline-none text-sm"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
            />
            <i className="fas fa-search text-[#4f46e5] text-sm"></i>
          </div>

          {/* Buttons (Create Communication and Signout) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowModal(true)} // Open the modal when clicked
              className="bg-white text-[#4f46e5] border-none px-3 py-2 rounded-xl font-medium flex items-center gap-1 cursor-pointer transition-all duration-300 ease-in-out hover:translate-y-[-1px] shadow-sm text-xs"
            >
              <i className="fas fa-plus text-xs"></i> Create communication
            </button>
            <button
              onClick={() => navigate('/login')} // Open the modal when clicked
              className="bg-white text-[#4f46e5] border-none px-3 py-2 rounded-xl font-medium flex items-center gap-1 cursor-pointer transition-all duration-300 ease-in-out hover:translate-y-[-1px] shadow-sm text-xs"
            >
              <i className="fas fa-sign-out-alt text-xs"></i> Signout
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-3 mt-1 justify-center sm:justify-start">
          <span
            className={`cursor-pointer py-1 px-3 rounded-xl font-medium transition-all duration-300 ease-in-out hover:bg-white hover:text-[#4f46e5] ${activeTab === "overView"
              ? "bg-white text-[#4f46e5] font-semibold shadow-sm"
              : "text-[#e2e8f0]"} `}
            onClick={() => setActiveTab("overView")}
          >
            Overview
          </span>
          <span
            className={`cursor-pointer py-1 px-3 rounded-xl font-medium transition-all duration-300 ease-in-out hover:bg-white hover:text-[#4f46e5] ${activeTab === "calender"
              ? "bg-white text-[#4f46e5] font-semibold shadow-sm"
              : "text-[#e2e8f0]"} `}
            onClick={() => setActiveTab("calender")}
          >
            Calendar View
          </span>
        </div>
      </header>



      <div className="dashboard-layout">
        {activeTab === "overView" ? (
          <div className="sidebar-section">
            <SummaryPage
              events={filteredEvents}
              openEditModal={openEditModal}
              onDelete={handleSelectEvent}
            />
            <div>
              <EventList events={filteredEvents} openEditModal={openEditModal} onDelete={handleSelectEvent} />

              <RecentEnents events={filteredEvents} />
            </div>
            <OnGoingEvents events={filteredEvents} />
          </div>
        ) : (
          <div className="calendar-section">
            <CalendarComponent
              events={filteredEvents}
            />
          </div>
        )}
      </div>

      {showModal && (
        <CreateEventModal
          showModal={showModal}
          newEvent={newEvent}
          handleInputChange={handleInputChange}
          handleSubmitNewEvent={handleSubmitNewEvent}
          closeModal={() => setShowModal(false)} // Close modal logic
        />
      )}

      {showEditModal && (
        <EditEventModal
          event={editEvent}
          onSubmit={handleSubmitEditEvent}
          closeModal={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;

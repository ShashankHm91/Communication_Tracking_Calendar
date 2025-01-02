const BASE_URL = 'http://localhost:4500/api/v1/';

const handleFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`HTTP ${response.status}: ${error.message || response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`);
    throw error;
  }
};

export const fetchEvents = async () => {
  try {
    const data = await handleFetch(`${BASE_URL}event/getAllEvents`);
    console.log(data);

    return data.map(event => ({
      ...event,
      id: event._id || event.id,
      date: new Date(event.date),
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const updateEvent = async (event) => {
  try {
    const eventId = event._id || event.id;

    if (!eventId) {
      throw new Error('Event ID is required for update');
    }

    // Prepare event data for API
    const eventForApi = {
      date: new Date(event.date).toISOString(),
      companyName: event.companyName,
      meetingGoal: event.meetingGoal,
      location: event.location,
      linkedinProfile: event.linkedinProfile,
      email: event.emails,
      phoneNumbers: event.phoneNumbers,
      communicationMethod: event.communicationMethod,
      communicationStatus: event.communicationStatus,
    };

    const updatedEvent = await handleFetch(`${BASE_URL}event/updateEvent/${eventId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventForApi),
    });

    return {
      ...updatedEvent,
      id: updatedEvent._id || updatedEvent.id,
      date: new Date(updatedEvent.date),
    };
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};



export const addEvent = async (events) => {
  try {
    // Ensure the input is always an array
    const eventsToSend = Array.isArray(events) ? events : [events];

    // Prepare events for the API by converting the date to ISO string
    const eventsForApi = eventsToSend.map(event => ({
      ...event,
      date: event.date.toISOString(),
    }));

    // Make the API request
    const response = await handleFetch(`${BASE_URL}event/createEvent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventsForApi),
    });

    // Assuming the response has a property `events` that is an array
    const newEvents = response.events || [];

    // Check if the response contains an array of events
    if (Array.isArray(newEvents)) {
      // Convert the date fields back to Date objects and return the events
      return newEvents.map(event => ({
        ...event,
        date: new Date(event.date),
      }));
    } else {
      console.error('API response is not an array:', newEvents);
      return []; // Return an empty array or handle it based on your use case
    }
  } catch (error) {
    console.error('Error adding events:', error);
    throw error;
  }
};


export const deleteEvent = async (eventId) => {
  try {
    await handleFetch(`${BASE_URL}event/deleteEvent/${eventId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};




// Login
export const login = async (credentials) => {
  try {
    console.log(credentials)
    const response = await handleFetch(`${BASE_URL}auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),

    });
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};


// Sign Up
export const signUp = async (formData) => {
  try {
    const response = await handleFetch(`${BASE_URL}auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    // Save JWT token in localStorage
    localStorage.setItem("authToken", response.token);

    return response;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Forgot Password
export const forgotPassword = async (email, newPassword) => {
  try {
    const response = await handleFetch(`${BASE_URL}auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword }),
    });
    return response;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './CalendarComponent.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const CalendarComponent = ({ events, onEventDrop, onSelectEvent }) => {
  const moveEvent = ({ event, date }) => {
    const updatedEvent = {
      ...event,
      id: event._id || event.id, // Ensure consistency in event ID
      start: new Date(date), // Update start time
      end: new Date(date.getTime() + 60 * 60 * 1000), // Set end time 1 hour after start
    };

    onEventDrop(updatedEvent);
  };

  // Convert event data from `date` to `start` and `end`
  const formattedEvents = events.map(event => ({
    ...event,
    id: event._id || event.id, // Ensure consistent ID structure for all events
    start: new Date(event.date), // Set start time from `date`
    end: new Date(new Date(event.date).getTime() + 60 * 60 * 1000), // Set end time 1 hour after start
  }));

  // Custom event rendering function
  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: '#ffdd57', // Example background color
        color: 'black',
        padding: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '14px',
      }
    };
  };

  // Customize how events are rendered (display `companyName` in the event box)
  const eventComponent = ({ event }) => (
    <div className="custom-event">
      {event.companyName}
    </div>
  );

  return (
    <div className="calendar-wrapper">
      <DnDCalendar
        localizer={localizer}
        events={formattedEvents}
        onEventDrop={moveEvent}
        onSelectEvent={onSelectEvent}
        style={{ height: 'calc(100vh - 100px)' }}
        defaultView="month"
        views={['month', 'week', 'day']}
        step={30}
        showMultiDayTimes
        resizable
        selectable
        popup
        draggableAccessor={() => true}
        eventPropGetter={eventStyleGetter} // Apply custom styles
        components={{
          event: eventComponent, // Render custom event component
        }}
      />
    </div>
  );
};

export default CalendarComponent;

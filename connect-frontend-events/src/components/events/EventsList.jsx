import { useEffect, useState } from 'react';
// Removed Supabase import

const EventsList = ({ userId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('http://localhost:5000/api/events');
      const data = await res.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const register = async (eventId) => {
    await fetch('http://localhost:5000/api/registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_id: eventId, user_id: userId }),
    });
    alert('Registered successfully');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Upcoming Events</h2>
      {events.map((event) => (
        <div key={event.id} className="p-4 border rounded">
          <h3 className="text-lg font-bold">{event.title}</h3>
          <p>{event.description}</p>
          <p className="text-sm text-gray-500">Scheduled at: {event.scheduled_at}</p>
          <button
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => register(event.id)}
          >
            Register
          </button>
        </div>
      ))}
    </div>
  );
};

export default EventsList;

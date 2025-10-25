import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import LoadingImg from '../../assets/Loading.png';

const EventsList = ({ userId, events: eventsProp, webinars: webinarsProp, loading: propLoading }) => {
  const [events, setEvents] = useState(eventsProp || []);
  const [loading, setLoading] = useState(propLoading ?? (!eventsProp && !webinarsProp));
  const [error, setError] = useState(null);

  useEffect(() => {
    // If parent provided events, use them and skip fetching
    if (eventsProp) {
      setEvents(eventsProp);
      setLoading(propLoading || false);
      return;
    }

    const fetchEvents = async () => {
      setLoading(true);
      try {
        const data = await api.get('/api/events');
        setEvents(data || []);
      } catch (err) {
        setError(err.message || 'Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [eventsProp, propLoading]);

  if (loading) return (
    <div className="p-4 flex justify-center">
      <img src={LoadingImg} alt="Loading" className="w-28 sm:w-36 md:w-48 lg:w-56 object-contain" />
    </div>
  );
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Upcoming Events</h2>
      {events.map((event) => (
        <div key={event.id} className="p-4 border rounded-lg shadow-sm">
          <h3 className="text-lg font-bold">{event.title}</h3>
          <p>{event.description}</p>
          {event.scheduledAt && (
            <p className="text-sm text-gray-500">{new Date(event.scheduledAt).toLocaleString()}</p>
          )}
          {event.hostId && <p className="text-sm text-gray-600">Host: {event.hostId}</p>}
        </div>
      ))}
    </div>
  );
};

export default EventsList;
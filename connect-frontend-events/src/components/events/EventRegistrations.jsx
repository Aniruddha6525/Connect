
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
const LoadingImg = '/images/Loading.png';

const EventRegistrations = ({ eventId }) => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegs = async () => {
      if (!eventId) return setLoading(false);
      setLoading(true);
      try {
        const data = await api.get(`/api/events/${eventId}/registrations`);
        setRegistrations(data || []);
      } catch (err) {
        console.error('Failed to fetch registrations', err);
        setError(err.message || 'Failed to load registrations');
      } finally {
        setLoading(false);
      }
    };
    fetchRegs();
  }, [eventId]);

  if (loading) return (
    <div className="p-4 flex justify-center">
      <img src={LoadingImg} alt="Loading registrations" className="w-28 sm:w-36 md:w-48 lg:w-56 object-contain" />
    </div>
  );
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Registrations</h2>
      <ul>
        {registrations.map((r) => (
          <li key={r.id} className="border-b p-2">
            {r.user?.fullName || r.user?.full_name || 'Unknown'} ({r.user?.email || 'no-email'})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventRegistrations;

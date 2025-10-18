
import { useEffect, useState } from 'react';

const EventRegistrations = ({ eventId }) => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegs = async () => {
      const res = await fetch(`http://localhost:5000/api/events/${eventId}/registrations`);
      const data = await res.json();
      setRegistrations(data);
    };
    if (eventId) fetchRegs();
  }, [eventId]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Registrations</h2>
      <ul>
        {registrations.map((r) => (
          <li key={r.id} className="border-b p-2">
            {r.users?.full_name} ({r.users?.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventRegistrations;

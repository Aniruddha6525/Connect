import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { api } from '../../services/api';
const LoadingImg = '/images/Loading.png';

function HostEvents() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null));
    return () => unsub();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (!user) return setLoading(false);
      setLoading(true);
      try {
        const data = await api.get(`/api/events/hosted-by/${user.uid}`);
        setEvents(data || []);
      } catch (err) {
        console.error('Failed to fetch hosted events', err);
        setError(err.message || 'Failed to fetch hosted events');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎤 Host Events</h1>
      <p className="text-gray-600 mb-4">Host and manage webinars, workshops, and mentorship sessions.</p>

      {loading && (
        <div className="flex justify-center">
          <img src={LoadingImg} alt="Loading hosted events" className="w-28 sm:w-36 md:w-48 lg:w-56 object-contain" />
        </div>
      )}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && events.length === 0 && <div>No hosted events found.</div>}

      {!loading && events.length > 0 && (
        <ul className="space-y-3">
          {events.map((e) => (
            <li key={e.id} className="p-3 border rounded">
              <div className="font-bold">{e.title}</div>
              <div className="text-sm text-gray-600">{e.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HostEvents;

import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { api } from '../../services/api';
import LoadingImg from '../../assets/Loading.png';

function Mentees() {
  const [user, setUser] = useState(null);
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const fetchMentees = async () => {
      if (!user) return setLoading(false);
      setLoading(true);
      setError(null);
      try {
        // Use firebase uid to identify mentor on backend. Ensure UID is URI-encoded
  const encoded = encodeURIComponent(user.uid);
  // Use query parameter to avoid path-encoding issues
  const data = await api.get(`/api/mentorships/mentees`, { params: { id: encoded } });
        setMentees(data || []);
      } catch (err) {
        console.error('Failed to fetch mentees', err);
        // Prefer error body if present
        setError((err && err.body && err.body.error) || err.message || 'Failed to load mentees');
      } finally {
        setLoading(false);
      }
    };
    fetchMentees();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👥 Manage Mentees</h1>
      <p className="text-gray-600 mb-4">This page allows mentors to view and manage their mentees.</p>

      {loading && (
        <div className="flex justify-center">
          <img src={LoadingImg} alt="Loading mentees" className="w-28 sm:w-36 md:w-48 lg:w-56 object-contain" />
        </div>
      )}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && mentees.length === 0 && <div>No mentees found.</div>}

      {!loading && mentees.length > 0 && (
        <ul className="space-y-3">
          {mentees.map((m) => (
            <li key={m.id} className="p-3 border rounded">
              <div className="font-bold">{m.fullName || m.email}</div>
              <div className="text-sm text-gray-600">{m.email}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Mentees;
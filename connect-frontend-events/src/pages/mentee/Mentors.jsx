import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
const LoadingImg = '/images/Loading.png';

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const users = await api.get('/api/users', { params: { role: 'mentor' } });
        setMentors(users || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-48">
      <img src={LoadingImg} alt="Loading" className="w-28 sm:w-36 md:w-48 object-contain" />
    </div>
  );
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Find a Mentor</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map(mentor => (
          <div key={mentor.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{mentor.fullName}</h2>
            <p className="text-gray-600">{mentor.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentors;
import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import LoadingImg from '../../assets/Loading.png';

function Feedback() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await api.get('/api/projects');
        setProjects(data || []);
      } catch (err) {
        console.error('Failed to fetch projects', err);
        setError(err.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Project Feedback</h1>
      <p className="text-gray-600 mb-4">Mentors can provide detailed feedback on submitted projects here.</p>

      {loading && (
        <div className="flex justify-center">
          <img src={LoadingImg} alt="Loading projects" className="w-28 sm:w-36 md:w-48 lg:w-56 object-contain" />
        </div>
      )}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && projects.length === 0 && <div>No projects submitted yet.</div>}

      {!loading && projects.length > 0 && (
        <ul className="space-y-3">
          {projects.map((p) => (
            <li key={p.id} className="p-3 border rounded">
              <div className="font-bold">{p.title}</div>
              <div className="text-sm text-gray-600">{p.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Feedback;
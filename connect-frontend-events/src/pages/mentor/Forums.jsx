import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import LoadingImg from '../../assets/Loading.png';

function Forums() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await api.get('/api/forums');
        setPosts(data || []);
      } catch (err) {
        console.error('Failed to fetch forum posts', err);
        setError(err.message || 'Failed to load forum posts');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">💬 Community Forums</h1>
      <p className="text-gray-600 mb-4">Join discussions, answer questions, and support mentees in forums.</p>

      {loading && (
        <div className="flex justify-center">
          <img src={LoadingImg} alt="Loading forum posts" className="w-28 sm:w-36 md:w-48 lg:w-56 object-contain" />
        </div>
      )}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && posts.length === 0 && <div>No posts yet.</div>}

      {!loading && posts.length > 0 && (
        <ul className="space-y-3">
          {posts.map((p) => (
            <li key={p.id} className="p-3 border rounded">
              <div className="font-bold">{p.title}</div>
              <div className="text-sm text-gray-600">{p.content}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Forums;
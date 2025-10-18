import { useEffect, useState } from 'react';
import { auth } from '../services/firebase';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  async function fetchProfile() {
    try {
      const response = await fetch(`/api/users/${user.uid}`);
      const data = await response.json();
      
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
    
    setLoading(false);
  }

  async function handleChange(e) {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/users/${user.uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      
      if (response.ok) {
        alert('Profile updated!');
      } else {
        alert('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  }

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={profile.name || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Name"
        />
        <textarea
          name="bio"
          value={profile.bio || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Short bio"
        />
        <input
          type="url"
          name="linkedin"
          value={profile.linkedin || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="LinkedIn URL"
        />
        <input
          type="url"
          name="github"
          value={profile.github || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="GitHub URL"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;


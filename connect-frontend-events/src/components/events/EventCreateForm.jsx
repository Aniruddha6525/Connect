import { useState } from 'react';
import { api } from '../../services/api';

const EventCreateForm = ({ hostId }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    scheduledAt: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // send in flexible keys the backend accepts
    const payload = {
      title: form.title,
      description: form.description,
      scheduled_at: form.scheduledAt,
      hostId: hostId,
    };
    try {
      await api.post('/api/events', { body: payload });
      alert('Event created!');
    } catch (err) {
      console.error('Failed to create event', err);
      alert('Failed to create event');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3 max-w-md border rounded">
      <input name="title" onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" />
      <textarea name="description" onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" />
      <input name="scheduled_at" type="datetime-local" onChange={handleChange} className="w-full border p-2 rounded" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Create Event</button>
    </form>
  );
};

export default EventCreateForm;

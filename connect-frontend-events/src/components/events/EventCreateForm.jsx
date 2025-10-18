const EventCreateForm = ({ hostId }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    scheduled_at: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, host_id: hostId };
    const res = await fetch('http://localhost:5000/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    alert('Event created!');
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

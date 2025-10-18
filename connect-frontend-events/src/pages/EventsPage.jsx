import { useEffect, useState } from 'react';
import EventsList from '../components/events/EventsList';
import EventCreateForm from '../components/events/EventCreateForm';
import EventRegistrations from '../components/events/EventRegistrations';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const EventsPage = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // student | expert | admin

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Default role or fetch from API
        setRole('student'); // Default role
        
        try {
          // You can replace this with a fetch to your backend API
          const response = await fetch(`/api/users/role?id=${user.uid}`);
          const data = await response.json();
          if (data && data.role) {
            setRole(data.role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    });
  }, []);

  if (!user || !role) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Webinars & Workshops</h1>

      {/* Expert/Admin: Create New Event */}
      {(role === 'expert' || role === 'admin') && (
        <EventCreateForm hostId={user.uid} />
      )}

      {/* Student: Register for Events */}
      {role === 'student' && <EventsList userId={user.uid} />}

      {/* Expert/Admin: View Registrations */}
      {(role === 'expert' || role === 'admin') && (
        <EventRegistrations eventId="replace-with-real-id" />
      )}
    </div>
  );
};

export default EventsPage;

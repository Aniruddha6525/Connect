import { useEffect, useState } from 'react';
import EventsList from '../components/events/EventsList';
import EventCreateForm from '../components/events/EventCreateForm';
import EventRegistrations from '../components/events/EventRegistrations';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { api } from '../services/api';

const LoadingImg = '/images/Loading.png';
const EventsImg = '/images/Events.png';

const EventsPage = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // student | expert | admin
  const [events, setEvents] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setRole('student');
        try {
          const data = await api.get('/api/users/role', { params: { id: user.uid } });
          if (data && data.role) setRole(data.role);
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      }
    });
  }, []);

  // Fetch events and webinars once (independent of auth). Keep separate loading state.
  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const [eventsData, webinarsData] = await Promise.all([
          api.get('/api/events'),
          api.get('/api/webinars').catch(() => []),
        ]);
        setEvents(eventsData || []);
        setWebinars(webinarsData || []);
      } catch (err) {
        console.error('Error fetching events/webinars:', err);
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!user || !role) return (
    <div className="flex justify-center items-center h-48">
      <img src={LoadingImg} alt="Loading authentication" className="w-28 sm:w-36 md:w-48 lg:w-56 object-contain" />
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-center mb-8"> {/* Center the whole block */}
        <div className="flex items-center space-x-6"> {/* Align items and add space */}
          <img src={EventsImg} alt="Events" className="w-[250px] h-auto" /> {/* Logo on the left with fixed width */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900"> {/* Larger text */}
            Webinars & Workshops
          </h1>
        </div>
      </div>

      {/* Expert/Admin: Create New Event */}
      {(role === 'expert' || role === 'admin') && (
        <EventCreateForm hostId={user.uid} />
      )}

      {/* Student: Register for Events */}
  {role === 'student' && <EventsList userId={user.uid} events={events} webinars={webinars} loading={dataLoading} />}

      {/* Expert/Admin: View Registrations */}
      {(role === 'expert' || role === 'admin') && (
        <EventRegistrations eventId="replace-with-real-id" />
      )}
    </div>
  );
};

export default EventsPage;

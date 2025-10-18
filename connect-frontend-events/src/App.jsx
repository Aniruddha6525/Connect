import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Navbar from './components/Navbar';
import EventsPage from './pages/EventsPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { getUserRole } from './services/getUserRole';
import HomePage from './pages/HomePage';
import Contact from './pages/ContactPage';

// Layout
import DashboardLayout from './layouts/DashboardLayout';

// Mentor pages
import Mentees from './pages/mentor/Mentees';
import Feedback from './pages/mentor/Feedback';
import HostEvents from './pages/mentor/HostEvents';
import Forums from './pages/mentor/Forums';

// Mentee pages
import Mentors from './pages/mentee/Mentors';
import SubmitProject from './pages/mentee/SubmitProject';
import Webinars from './pages/mentee/Webinars';
import Community from './pages/mentee/Community';

import ProfilePage from './pages/ProfilePage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const auth = getAuth();


  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const role = await getUserRole(currentUser.uid);
          console.log('Fetched user role:', role);
          setUserRole(role);
        } catch (err) {
          console.error('Failed to fetch role:', err);
        }
      }
      setLoading(false);
      clearTimeout(timeout);
    });

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar user={user} />
      <Routes>
        <Route 
          path="/" 
          element={<HomePage userRole={userRole} user={user} />} 
        />
        <Route 
          path="/events" 
          element={
            <ProtectedRoute user={user}>
              <EventsPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route
        path="/profile"
        element={
          <ProtectedRoute user={user}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
        {/* Mentor Routes */}
        <Route
          path="/mentees"
          element={
            <ProtectedRoute user={user}>
              <DashboardLayout userRole={userRole} user={user}>
                <Mentees />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute user={user}>
              <DashboardLayout userRole={userRole} user={user}>
                <Feedback />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/host-events"
          element={
            <ProtectedRoute user={user}>
              <DashboardLayout userRole={userRole} user={user}>
                <HostEvents />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/forums"
          element={
            <ProtectedRoute user={user}>
              <DashboardLayout userRole={userRole} user={user}>
                <Forums />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Mentee Routes */}
        <Route
          path="/mentors"
          element={
            <ProtectedRoute user={user}>
              <DashboardLayout userRole={userRole} user={user}>
                <Mentors />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit-project"
          element={
            <ProtectedRoute user={user}>
              <DashboardLayout userRole={userRole} user={user}>
                <SubmitProject />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/webinars"
          element={
            <ProtectedRoute user={user}>
              <DashboardLayout userRole={userRole} user={user}>
                <Webinars />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute user={user}>
              <DashboardLayout userRole={userRole} user={user}>
                <Community />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

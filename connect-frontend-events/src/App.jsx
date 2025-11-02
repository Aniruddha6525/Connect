import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import Navbar from './components/Navbar';
import EventsPage from './pages/EventsPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { getUserRole, getUserDetails } from './services/getUserRole';
import HomePage from './pages/HomePage';
import Contact from './pages/ContactPage';
import LandingPage from './pages/LandingPage';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPage from './pages/PrivacyPage';
import GlobalCommunityPage from './pages/GlobalCommunityPage';

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
const LoadingImg = '/images/Loading.png';


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
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
          const details = await getUserDetails(currentUser.uid);
          console.log('Fetched user role:', role);
          console.log('Fetched user details:', details);
          setUserRole(role);
          setUserDetails(details);
        } catch (err) {
          console.error('Failed to fetch user data:', err);
          // If user doesn't exist in our database, set defaults
          setUserRole('mentee');
          setUserDetails({
            role: 'mentee',
            fullName: currentUser.displayName || null,
            email: currentUser.email || null
          });
        }
      } else {
        setUserRole(null);
        setUserDetails(null);
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
        <img src={LoadingImg} alt="Loading" className="w-28 sm:w-36 md:w-48 lg:w-56 object-contain" />
      </div>
    );
  }

  return (
    <div>
      <Navbar user={user} userDetails={userDetails} />
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={!user ? <LandingPage /> : <HomePage userRole={userRole} user={user} />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/terms" element={<TermsOfServicePage />} />
  <Route path="/privacy" element={<PrivacyPage />} />
  <Route path="/global-community" element={<GlobalCommunityPage />} />  

        {/* --- Authentication Routes --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* --- Core Protected Routes (Require Login) --- */}
        <Route path="/events" element={<ProtectedRoute user={user}><EventsPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute user={user}><ProfilePage /></ProtectedRoute>} />
        {/* Note: HomePage logic is handled within the "/" route based on user login status */}

        {/* --- Role-Specific Routes (Inside Dashboard Layout) --- */}

        {/* --- Mentee Specific Routes --- */}
        <Route path="/mentors" element={<ProtectedRoute user={user}><DashboardLayout userRole={userRole} user={user}><Mentors /></DashboardLayout></ProtectedRoute>} />
        <Route path="/submit-project" element={<RoleProtectedRoute user={user} userRole={userRole} allowedRole="mentee"><DashboardLayout userRole={userRole} user={user}><SubmitProject /></DashboardLayout></RoleProtectedRoute>} />
        <Route path="/webinars" element={<ProtectedRoute user={user}><DashboardLayout userRole={userRole} user={user}><Webinars /></DashboardLayout></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute user={user}><DashboardLayout userRole={userRole} user={user}><Community /></DashboardLayout></ProtectedRoute>} />
        
        {/* --- Mentor Specific Routes --- */}
        <Route path="/mentees" element={<ProtectedRoute user={user}><DashboardLayout userRole={userRole} user={user}><Mentees /></DashboardLayout></ProtectedRoute>} />
        <Route path="/feedback" element={<ProtectedRoute user={user}><DashboardLayout userRole={userRole} user={user}><Feedback /></DashboardLayout></ProtectedRoute>} />
        <Route path="/host-events" element={<ProtectedRoute user={user}><DashboardLayout userRole={userRole} user={user}><HostEvents /></DashboardLayout></ProtectedRoute>} />
        <Route path="/forums" element={<ProtectedRoute user={user}><DashboardLayout userRole={userRole} user={user}><Forums /></DashboardLayout></ProtectedRoute>} />
        
        {/* --- Optional: Catch-all 404 Route --- */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;

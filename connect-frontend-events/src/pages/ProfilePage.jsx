import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
// Removed theme import
// import LoadingImg from '../assets/Loading.png'; // We'll use a CSS spinner instead
import { api } from '../services/api';
import profile from '../assets/Profile-Interface.png';
import UpdateImg from '../assets/Update.png';

// --- Standard Logo Component --- (Include this or import it)
const Logo = ({ src, alt = "Company Logo", className = "h-16 w-auto" }) => (
  <img 
    src={src} 
    alt={alt} 
    className={`inline-block ${className}`} 
  />
);

// --- Simple Spinner Component ---
const Spinner = () => (
    <div className="border-t-4 border-orange-500 border-solid rounded-full animate-spin h-12 w-12"></div>
);

const ProfilePage = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', bio: '', linkedin: '', github: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added for button state

  const auth = getAuth();
  const user = auth.currentUser;

  // --- useEffect hook remains the same ---
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        try {
          const data = await api.get('/api/users/details', { params: { id: user.uid } });
          setFormData({
            fullName: data.fullName || user.displayName || '',
            email: data.email || user.email || '',
            bio: data.bio || '',
            linkedin: data.linkedin || '',
            github: data.github || '',
          });
        } catch (err) {
          if (err?.status === 404) {
            console.log('User not found in DB, creating profile...');
            try {
              await createUserProfile();
              // Re-fetch after creating (optional, createUserProfile might set state)
              const data = await api.get('/api/users/details', { params: { id: user.uid } });
               setFormData({
                fullName: data.fullName || user.displayName || '',
                email: data.email || user.email || '',
                bio: data.bio || '',
                linkedin: data.linkedin || '',
                github: data.github || '',
              });
            } catch (e) {
              setError(e.message || 'Failed to create or fetch profile');
            }
          } else {
            setError(err.message || 'Failed to fetch user details');
          }
        } finally {
          setLoading(false);
        }
      } else {
         setLoading(false); // Stop loading if no user
         setError('User not logged in.');
      }
    };

    const createUserProfile = async () => {
        try {
            const newUserDetails = await api.post('/api/users', { body: {
                firebase_uid: user.uid,
                email: user.email,
                full_name: user.displayName || 'New User',
                role: 'mentee', // Default role
                bio: '',
                linkedin: '',
                github: ''
            } });
            setFormData({ // Update state directly after creation
                fullName: newUserDetails.fullName || user.displayName || '',
                email: newUserDetails.email || user.email || '',
                bio: newUserDetails.bio || '',
                linkedin: newUserDetails.linkedin || '',
                github: newUserDetails.github || '',
            });
            setSuccess('Profile created successfully!');
        } catch (err) {
             // Rethrow or set specific error
             throw new Error(err.message || 'Failed to create profile');
        }
    };

    fetchUserDetails();
  }, [user]); // Dependency array includes user


  // --- handleInputChange remains the same ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- handleSubmit remains the same ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true); // Disable button

    if (!user) {
      setError('You must be logged in to update your profile.');
       setIsSubmitting(false);
      return;
    }

    try {
      const updatedUser = await api.put('/api/users/update', { body: {
        firebaseUid: user.uid,
        full_name: formData.fullName,
        bio: formData.bio,
        linkedin: formData.linkedin,
        github: formData.github,
      } });

      // Update state with potentially corrected data from backend
      setFormData({
        fullName: updatedUser.fullName,
        email: updatedUser.email, 
        bio: updatedUser.bio || '',
        linkedin: updatedUser.linkedin || '',
        github: updatedUser.github || '',
      });

      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
        setIsSubmitting(false); // Re-enable button
    }
  };

  // --- Loading State ---
  if (loading) return (
    <div className="flex justify-center items-center min-h-[calc(100vh-10rem)] bg-gray-50">
      <Spinner />
    </div>
  );

  // --- Main Component Return (Styling Updated) ---
  return (
    // Main container with background and padding
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Centered content */}
      <div className="max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded-lg shadow-lg">
        
        {/* Logo */}
        <div className="text-center mb-8">
           <Logo 
            src={profile} 
            alt="Connect Logo" 
            className="h-[250px] sm:h-[250px] w-auto mx-auto" 
          />
        </div>

        {/* Form Card */}
        <div >
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Your Profile</h1>
          
          {/* Messages */}
          {error && <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md mb-6 text-sm">{error}</div>}
          {success && <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-md mb-6 text-sm">{success}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              />
            </div>
            
            {/* Email (Disabled) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                disabled 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
            
            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Bio <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <textarea
                name="bio"
                id="bio"
                rows={4}
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                placeholder="Tell us a bit about yourself..."
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn Profile <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                type="url" // Use type="url" for better validation/input experience
                name="linkedin"
                id="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              />
            </div>

            {/* GitHub */}
            <div>
              <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
                GitHub Profile <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                type="url" // Use type="url"
                name="github"
                id="github"
                value={formData.github}
                onChange={handleInputChange}
                placeholder="https://github.com/yourusername"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 transition duration-150"
              />
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-md shadow-md transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Updating...' : (
                  <span className="flex items-center space-x-2">
                    {/* <img src={UpdateImg} alt="Update" className="w-5 h-5" /> */}
                    <span>Update Profile</span>
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={async () => {
                  const { getAuth, signOut } = await import('firebase/auth');
                  const auth = getAuth();
                  try {
                    await signOut(auth);
                    // Redirect using useNavigate hook is generally preferred in React Router
                    // For simplicity here, window.location is kept, but consider using useNavigate
                    window.location.href = '/login'; 
                  } catch (error) {
                      console.error('Logout failed:', error);
                      setError('Failed to log out. Please try again.'); // Show error to user
                  }
                }}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md shadow-md transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
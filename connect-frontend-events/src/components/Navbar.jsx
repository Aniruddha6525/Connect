import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = ({ user, userDetails }) => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  // Array of letters for the animation
  const brandName = "Connect";
  const letters = brandName.split('');
  // Calculate total animation time (7 letters * 120ms delay)
  const typingDuration = letters.length * 120; // 840ms

  return (
    <nav className="bg-gray-50 text-gray-900 p-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          
          {/* --- MERGED ANIMATION LOGO LINK --- */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-orange-600 flex items-end group relative cursor-pointer"
          >
            {letters.map((letter, index) => (
              <span 
                key={index} 
                className="inline-block relative opacity-0 animate-type-in"
                // Staggered typing delay for each letter
                style={{ animationDelay: `${index * 120}ms` }} 
              >
                {letter}
                
                {/* Connection line (visible on parent hover) */}
                {index < letters.length - 1 && (
                  <span className="absolute bottom-1.5 left-[calc(100%-2px)] w-0 h-0.5 
                                   bg-orange-400 opacity-0 transition-all duration-300 
                                   group-hover:w-3 group-hover:opacity-60 
                                   group-hover:md:w-4">
                  </span>
                )}
              </span>
            ))}
            
            {/* Blinking cursor at the end */}
            <span 
              className="w-0.5 h-3/4 bg-orange-600 ml-0.5 animate-blink-cursor"
              // Delay cursor animation until typing is finished
              style={{ animationDelay: `${typingDuration}ms` }}
            ></span>
          </Link>

          {user ? (
            <>
              <span className="text-orange-600">|</span>
              <span className="font-semibold text-gray-900">
                {userDetails?.fullName || ''}
              </span>
            </>
          ) : null}
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/events" className="hover:text-orange-600 transition duration-200">
            Events
          </Link>
          <Link to="/contact" className="hover:text-orange-600 transition duration-200">
            Contact
          </Link>
          {user ? (
            <Link to="/profile" className="hover:text-orange-600 transition duration-200">
              Profile
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
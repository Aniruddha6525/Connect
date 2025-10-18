import { Link } from 'react-router-dom';

function HomePage({ userRole, user }) {
  console.log('HomePage userRole:', userRole);
  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Welcome {user?.displayName || user?.email}!
      </h1>

      {/* Mentor Dashboard */}
      {userRole === 'mentor' && (
        <div className="bg-blue-100 p-4 sm:p-6 rounded-lg mb-6 shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Mentor Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/mentees" className="bg-white p-4 rounded-lg shadow hover:bg-blue-200 transition">
              🧑‍🏫 View and manage your mentees
            </Link>
            <Link to="/feedback" className="bg-white p-4 rounded-lg shadow hover:bg-blue-200 transition">
              📋 Provide project feedback
            </Link>
            <Link to="/host-events" className="bg-white p-4 rounded-lg shadow hover:bg-blue-200 transition">
              🎤 Host webinars & events
            </Link>
            <Link to="/forums" className="bg-white p-4 rounded-lg shadow hover:bg-blue-200 transition">
              💬 Join forums to guide discussions
            </Link>
          </div>
        </div>
      )}

      {/* Mentee Dashboard */}
      {userRole === 'mentee' && (
        <div className="bg-green-100 p-4 sm:p-6 rounded-lg mb-6 shadow-md">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Mentee Dashboard 1</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/mentors" className="bg-white p-4 rounded-lg shadow hover:bg-green-200 transition">
              🔍 Discover and connect with mentors
            </Link>
            <Link to="/submit-project" className="bg-white p-4 rounded-lg shadow hover:bg-green-200 transition">
              📁 Submit projects for feedback
            </Link>
            <Link to="/webinars" className="bg-white p-4 rounded-lg shadow hover:bg-green-200 transition">
              🎓 Attend webinars and workshops
            </Link>
            <Link to="/community" className="bg-white p-4 rounded-lg shadow hover:bg-green-200 transition">
              💡 Engage in community discussions
            </Link>
          </div>
        </div>
      )}

      {!userRole && (
        <div className="bg-yellow-100 text-yellow-700 p-3 rounded shadow-md">
          <p>⚠️ Your role is not set yet. Please complete your profile or contact support.</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;

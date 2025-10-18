import { Link, useLocation } from 'react-router-dom';

function DashboardLayout({ children, userRole, user }) {
  const location = useLocation();

  const mentorLinks = [
    { to: '/mentees', label: '👥 Mentees' },
    { to: '/feedback', label: '📋 Feedback' },
    { to: '/host-events', label: '🎤 Host Events' },
    { to: '/forums', label: '💬 Forums' }
  ];

  const menteeLinks = [
    { to: '/mentors', label: '🔍 Find Mentors' },
    { to: '/submit-project', label: '📁 Submit Project' },
    { to: '/webinars', label: '🎓 Webinars' },
    { to: '/community', label: '💡 Community' }
  ];

  const links = userRole === 'mentor' ? mentorLinks : menteeLinks;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r hidden md:block">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">Dashboard</h2>
          <p className="text-sm text-gray-500">{user?.displayName}</p>
        </div>
        <nav className="p-4 space-y-2">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`block p-2 rounded hover:bg-gray-200 ${
                location.pathname === link.to ? 'bg-gray-300 font-semibold' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;

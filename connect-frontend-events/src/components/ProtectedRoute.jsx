import { Navigate } from 'react-router-dom';
/**
 * Props:
 * - user: Firebase user object
 * - requiredRole: 'mentor' | 'mentee' | null
 * - userRole: actual role of the user (from DB)
 */

function ProtectedRoute({ user, userRole, requiredRole, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

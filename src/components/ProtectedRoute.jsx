import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;

import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import Loading from './Loading';

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const { userData } = useUser();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (!userData) {
    return <Loading />;
  }

  if (userData) {
    return children;
  }
}

export default ProtectedRoute;

import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// eslint-disable-next-line react/prop-types
function AnonOnlyRoute({ children }) {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return children;
}

export default AnonOnlyRoute;

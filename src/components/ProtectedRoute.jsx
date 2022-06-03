import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import Loading from './Loading';

/**
 * React function component. Parent for pages/components only accessible for authorized user. If user is not logged in she is redirected to the login page.
 * Renders Loading spinner while waiting for userData to arrive form API.
 *
 * @param {object} props - Props object for component.
 * @param {object} props.children - the children the component should render.
 * @returns {ReactElement} - Children.
 */
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

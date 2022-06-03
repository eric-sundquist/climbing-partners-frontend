import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
/**
 * React function component. Parent for pages/components only accessible for anonymous users. If user is logged in he is redirected to the dashboard.
 *
 * @param {object} props - Props object for component.
 * @param {object} props.children - the children the component should render.
 * @returns {ReactElement} - Children.
 */
function AnonOnlyRoute({ children }) {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default AnonOnlyRoute;

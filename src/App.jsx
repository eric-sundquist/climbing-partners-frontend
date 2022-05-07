import { Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { useUser } from './contexts/UserContext';
import Start from './pages/Start';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Account from './pages/Account';
import NoMatch from './pages/NoMatch';
import ResetPassword from './pages/ResetPassword';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AnonOnlyRoute from './components/AnonOnlyRoute';
import Profile from './pages/Profile';

function App() {
  const { currentUser } = useAuth();
  const { userData } = useUser();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            currentUser && userData ? (
              // Auth user
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            ) : (
              // Anon user
              <Start />
            )
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AnonOnlyRoute>
              <SignUp />
            </AnonOnlyRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AnonOnlyRoute>
              <LogIn />
            </AnonOnlyRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <AnonOnlyRoute>
              <ResetPassword />
            </AnonOnlyRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;

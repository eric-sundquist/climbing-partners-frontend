import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Account from './pages/Account';
import NoMatch from './pages/NoMatch';
import ResetPassword from './pages/ResetPassword';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';

function App() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState('');

  const fetchApi = async (method, route, token) => {
    console.log('FETCHING');
    const res = await fetch(`${process.env.REACT_APP_CP_APP_API_URL}${route}`, {
      method: method,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.log(res.status);
    }
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    if (currentUser) {
      const getUserData = async () => {
        const userDataFromApi = await fetchApi(
          'GET',
          `/users/${currentUser.uid}`,
          currentUser.accessToken
        );
        setUserData(userDataFromApi);
      };

      getUserData();
    }
  }, [currentUser]);

  console.log(userData);

  return (
    <Routes>
      {currentUser ? (
        // Logged in
        <Route path="/" element={<Layout />}>
          {userData && (
            <>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Dashboard id={userData.id} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile profileData={userData.profile} />
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
              <Route path="*" element={<NoMatch />} />
            </>
          )}
        </Route>
      ) : (
        // Not logged in
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;

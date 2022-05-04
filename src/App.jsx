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
import Loading from './components/Loading';

function App() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState('');

  /**
   * Fetches user data from API.
   *
   * @param {String} route - The route to send the request to.
   * @returns {Promise} JSON response from server.
   */
  const fetchUser = async (route) => {
    console.log('FETCHING');
    const res = await fetch(`${process.env.REACT_APP_CP_APP_API_URL}${route}`, {
      headers: {
        authorization: `Bearer ${currentUser.accessToken}`,
      },
    });
    if (!res.ok) {
      // Handle errors... Maybe alert flash
      console.log(res.status);
      console.log(res.statusText);
    }
    return res.json();
  };

  /**
   * Updates user on server.
   *
   * @param {String} route - The route to send the request to.
   * @param {Object} updatedUser - updated user.
   * @returns {Promise} JSON response from server.
   */
  const fetchEditUser = async (route, updatedUser) => {
    console.log('FETCHING EDIT USER');
    const res = await fetch(`${process.env.REACT_APP_CP_APP_API_URL}${route}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${currentUser.accessToken}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });
    if (!res.ok) {
      // Handle errors... Maybe alert flash
      console.log(res.status);
      console.log(res.statusText);
    }

    const data = await res.json();
    setUserData(data);
  };

  useEffect(() => {
    if (currentUser) {
      const getUserData = async () => {
        const userDataFromApi = await fetchUser(`/users/${currentUser.uid}`);
        setUserData(userDataFromApi);
      };

      getUserData();
    }
  }, [currentUser]);

  console.log('Re-rendering APP.js');

  if (currentUser) {
    // Loading screen while waiting for user data.
    if (!userData) return <Loading />;

    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard user={userData} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile
                  uid={currentUser.uid}
                  profileData={userData.profile}
                  fetchEditUser={fetchEditUser}
                />
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
        </Route>
      </Routes>
    );
  }

  // Not logged in
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;

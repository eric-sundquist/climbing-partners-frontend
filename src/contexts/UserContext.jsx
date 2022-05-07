import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState('');

  /**
   * Fetches user data from API.
   *
   * @param {String} route - The route to send the request to.
   * @returns {Promise} JSON response from server.
   */
  const fetchUser = async (route) => {
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
   * Get user data
   */
  useEffect(() => {
    if (currentUser) {
      const getUserData = async () => {
        const userDataFromApi = await fetchUser(`/users/${currentUser.uid}`);
        setUserData(userDataFromApi);
      };
      console.log('fetching user data');
      getUserData();
    }
    setIsLoading(false);
  }, [currentUser]);

  /**
   * Updates user on server.
   *
   * @param {String} route - The route to send the request to.
   * @param {Object} updatedUserProfile - updated user.
   * @returns {Promise} JSON response from server.
   */
  const updateUserProfile = async (updatedUserProfile) => {
    console.log('FETCHING EDIT USER');
    const res = await fetch(
      `${process.env.REACT_APP_CP_APP_API_URL}/users/${currentUser.uid}/profile`,
      {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${currentUser.accessToken}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedUserProfile),
      }
    );
    if (!res.ok) {
      // Handle errors... Maybe alert flash
      console.log(res.status);
      console.log(res.statusText);
    }

    const data = await res.json();

    setUserData(data);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    userData,
    updateUserProfile,
  };

  return <UserContext.Provider value={value}>{!isLoading && children}</UserContext.Provider>;
}

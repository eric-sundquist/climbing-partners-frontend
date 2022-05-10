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
    const token = await currentUser.getIdToken();
    const res = await fetch(`${process.env.REACT_APP_CP_APP_API_URL}${route}`, {
      headers: {
        authorization: `Bearer ${token}`,
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
    const token = await currentUser.getIdToken();
    const res = await fetch(
      `${process.env.REACT_APP_CP_APP_API_URL}/users/${currentUser.uid}/profile`,
      {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${token}`,
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

    const profileData = await res.json();

    setUserData((prev) => {
      console.log(profileData);
      // eslint-disable-next-line prefer-const
      let { profile, ...rest } = prev;
      profile = profileData;
      return { profile, ...rest };
    });
  };

  const postPartnerAd = async (partnerAdData) => {
    const token = await currentUser.getIdToken();
    const res = await fetch(
      `${process.env.REACT_APP_CP_APP_API_URL}/users/${currentUser.uid}/partner-ad`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(partnerAdData),
      }
    );

    if (!res.ok) {
      // TODO
      // THROW ERROR, Pick up in error boudary???
      console.log(res.status);
      console.log(res.statusText);
      console.log(await res.json());
    }
    const ad = await res.json();
    // Update state
    setUserData((prev) => {
      const { ads, ...rest } = prev;
      ads.push(ad);
      return { ads, ...rest };
    });
  };

  const deleteAd = async (adId) => {
    const token = await currentUser.getIdToken();
    const res = await fetch(
      `${process.env.REACT_APP_CP_APP_API_URL}/users/${currentUser.uid}/partner-ad/${adId}`,
      {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      // TODO
      // THROW ERROR, Pick up in error boudary???
      console.log(res.status);
      console.log(res.statusText);
    }

    setUserData((prev) => {
      // eslint-disable-next-line prefer-const
      let { ads, ...rest } = prev;
      ads = ads.filter((ad) => ad.id !== adId);
      return { ads, ...rest };
    });
  };

  const searchMatchingPartners = async (date, location) => {
    const token = await currentUser.getIdToken();
    const route = `/partner-ads/filter?location=${location}&date=${date}`;
    const res = await fetch(`${process.env.REACT_APP_CP_APP_API_URL}${route}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      // Handle errors... Maybe alert flash
      console.log(res.status);
      console.log(res);
    }

    return res.json();
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    userData,
    updateUserProfile,
    postPartnerAd,
    deleteAd,
    searchMatchingPartners,
  };

  return <UserContext.Provider value={value}>{!isLoading && children}</UserContext.Provider>;
}

import { createContext, useContext, useState, useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useAuth } from './AuthContext';

const UserContext = createContext();

/**
 * For acessing current context values.
 *
 * @returns {object} -  Current context value, as given by the UserProvider context provider.
 */
export function useUser() {
  return useContext(UserContext);
}
/**
 * Provides userData context (state) to its children.
 *
 * @param {object} children - the child react components.
 * @returns {object} - The child react comonents wrapped with the context provider.
 */
export function UserProvider({ children }) {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState('');
  const handleError = useErrorHandler();

  /**
   * Fetches data from API.
   *
   * @param {String} route - The route to send the request to.
   * @param {String} method - Method for the request
   * @param {object} body - request body. If no value passed body is not sent witht he request.
   * @returns {Promise} JSON response from server.
   */
  const fetchFromApi = async (route, method, body = false) => {
    const token = await currentUser.getIdToken();
    const res = await fetch(`${process.env.REACT_APP_CP_APP_API_URL}${route}`, {
      method: method,
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    if (!res.ok) {
      handleError(`${res.status} - ${res.statusText}`);
    }
    return res.json();
  };

  /**
   * Get user data
   */
  useEffect(() => {
    if (currentUser) {
      const getUserData = async () => {
        const userDataFromApi = await fetchFromApi(`/users/${currentUser.uid}`, 'GET');
        setUserData(userDataFromApi);
      };
      getUserData();
    }
  }, [currentUser]);

  /**
   * Updates user on server.
   *
   * @param {Object} updatedUserProfile - updated user.
   */
  const updateUserProfile = async (updatedUserProfile) => {
    const profileData = await fetchFromApi(
      `/users/${currentUser.uid}/profile`,
      'PUT',
      updatedUserProfile
    );

    setUserData((prev) => {
      // eslint-disable-next-line prefer-const
      let { profile, ...rest } = prev;
      profile = profileData;
      return { profile, ...rest };
    });
  };

  /**
   * Creates a new partner ad for the current user.
   *
   * @param {object} partnerAdData -  Partner ad data to add.
   */
  const postPartnerAd = async (partnerAdData) => {
    const ad = await fetchFromApi(`/users/${currentUser.uid}/partner-ad`, 'POST', partnerAdData);

    setUserData((prev) => {
      const { ads, ...rest } = prev;
      ads.push(ad);
      return { ads, ...rest };
    });
  };

  /**
   * Delete an ad for the current user.
   *
   * @param {String} adId - Id for ad to remove.
   */
  const deleteAd = async (adId) => {
    await fetchFromApi(`/users/${currentUser.uid}/partner-ad/${adId}`, 'DELETE');

    setUserData((prev) => {
      // eslint-disable-next-line prefer-const
      let { ads, ...rest } = prev;
      ads = ads.filter((ad) => ad.id !== adId);
      return { ads, ...rest };
    });
  };

  /**
   * Searches ad database for matching partners by date and location.
   *
   * @param {String} date - date to search for.
   * @param {String} location - location to search for.
   * @returns {object[]} - matching partners.
   */
  const searchMatchingPartners = async (date, location) => {
    const mathchingPartners = await fetchFromApi(
      `/partner-ads/filter?location=${location}&date=${date}`,
      'GET'
    );
    return mathchingPartners.filter((ad) => ad.owner.uid !== userData.uid);
  };

  /**
   * Sends an climbing invite to a user.
   *
   * @param {String} targetUserId - user id to send invite to.
   * @param {String} adId - target user's ad id.
   * @param {String} currentUserAdId - current user's ad Id.
   */
  const sendInvite = (targetUserId, adId, currentUserAdId) => {
    fetchFromApi(`/users/${targetUserId}/invites`, 'POST', {
      fromUserId: userData.id,
      adId: adId,
      currentUserAdId: currentUserAdId,
    });
  };

  /**
   * Deletes an invite.
   *
   * @param {String} inviteId - id of the invite to delete.
   */
  const deleteInvite = async (inviteId) => {
    await fetchFromApi(`/users/${currentUser.uid}/invites/${inviteId}`, 'DELETE');

    setUserData((prev) => {
      // eslint-disable-next-line prefer-const
      let { invites, ...rest } = prev;
      // eslint-disable-next-line no-underscore-dangle
      invites = invites.filter((invite) => invite._id !== inviteId);
      return { invites, ...rest };
    });
  };

  /**
   * Accepts an invite.
   *
   * @param {String} inviteId - Id of invite that is accepted.
   */
  const acceptInvite = async (inviteId) => {
    await fetchFromApi(`/users/${currentUser.uid}/sessions`, 'POST', { inviteId: inviteId });

    const user = await fetchFromApi(`/users/${currentUser.uid}`, 'GET');
    setUserData(user);
  };

  /**
   * Clears the user data state. Used for example on logout.
   */
  const clearUserData = () => {
    setUserData(null);
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    userData,
    updateUserProfile,
    postPartnerAd,
    deleteAd,
    searchMatchingPartners,
    sendInvite,
    deleteInvite,
    acceptInvite,
    clearUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

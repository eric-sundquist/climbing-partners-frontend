import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

/**
 * Custom React Hook for acessing auth context values and functions.
 *
 * @returns {object} -  The current context values, as given by the context provider.
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Provides auth context (state) to its children.
 *
 * @param {object} props - the props object.
 * @param {object} props.children - the child react components.
 * @returns {object} - The children wrapped with the context provider.
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Returns Firebase method for creating a user account.
   *
   * @param {string} email - the email.
   * @param {string} password - the password.
   * @returns {Function} Firebase method.
   */
  function createUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  /**
   * Returns Firebase method for logging in a user.
   *
   * @param {string} email - the email.
   * @param {string} password - the password.
   * @returns {Function} Firebase method.
   */
  function loginUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  /**
   * Returns Firebase method for logging out a user.
   *
   * @returns {Function} Firebase method.
   */
  function logoutUser() {
    return signOut(auth);
  }

  /**
   * Returns Firebase method for reseting password.
   *
   * @param {string} email - the email.
   * @returns {Function} Firebase method.
   */
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsub;
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    currentUser,
    createUser,
    loginUser,
    logoutUser,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
}

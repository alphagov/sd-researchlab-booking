import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export const signOutUser = async () => {
  const [userValues, setUserValues] = useContext(UserContext);

  try {
    setUserValues({
      isLoggedIn: false,
      id: '',
      firstName: '',
      lastName: ''
    });

    localStorage.removeItem('labtoken');

    return true;
  } catch (error) {
    return false;
  }
};

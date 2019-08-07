import React, { createContext, useState } from 'react';

const initialValues = {};

const UserContext = createContext([{}, () => {}]);

const UserContextProvider = ({ children }) => {
  const [userValues, setUserValues] = useState(initialValues);

  return (
    <UserContext.Provider value={[userValues, setUserValues]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };

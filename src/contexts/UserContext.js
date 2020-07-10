import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  const [oauthInfo, setOauthInfo] = useState(null);

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, oauthInfo, setOauthInfo }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

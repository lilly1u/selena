import React, { createContext, useState } from "react";

export const CurrentUserContext = createContext({username: '', password: ''});
export const DisplayNameContext = createContext('');
export const UserTokenContext = createContext('');
export const URL = 'https://myselena.org';

const Providers = props => {
    const [currentUser, setCurrentUser] = useState({username: 'SelenaContent', password: 'eattheredpizza'});
    const [displayName, setDisplayName] = useState('');
    const [userToken, setUserToken] = useState('');

    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <UserTokenContext.Provider value={{ userToken, setUserToken }}>
            <DisplayNameContext.Provider value={{ displayName, setDisplayName }}>
              {props.children}
            </DisplayNameContext.Provider>
          </UserTokenContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default Providers;


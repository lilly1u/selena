import React, { createContext, useState } from "react";
import axios from 'axios'

export const CurrentUserContext = createContext({username: '', password: ''});
export const DisplayNameContext = createContext('');
export const UserTokenContext = createContext('');
export const URL = 'https://myselena.org';

const Providers = props => {
    const [currentUser, setCurrentUser] = useState({username: 'SelenaContent', password: 'eattheredpizza'});
    const [displayName, setDisplayName] = useState('');
    const [userToken, setUserToken] = useState('');

    const getToken = async() => {
        console.log("Current user: ", currentUser);

        try {
          const response = await axios.post(`${URL}/wp-json/learnpress/v1/token`, currentUser)
          if(await validateToken(response.data.token) === 200){
            setUserToken(response.data.token);
            console.log(response.data.user_display_name);
            setDisplayName(response.data.user_display_name);
          }
        } catch (error) {
          console.warn({message: 'validation error', error})
        }
      }

    const validateToken = async(token) => {
        try {
          const response = await axios.post(`${URL}/wp-json/learnpress/v1/token/validate`,{},{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })
          return(response.data.data.status)
        } catch (error) {
          return({error})
        }
      }
    

    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <UserTokenContext.Provider value={{ getToken, validateToken, userToken }}>
            <DisplayNameContext.Provider value={{ displayName }}>
              {props.children}
            </DisplayNameContext.Provider>
          </UserTokenContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default Providers;


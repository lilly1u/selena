import { createContext, useContext, useState,useEffect } from "react";

export const CurrentUserContext = createContext({username: '', password: ''});
export const URLContext = createContext('https://myselena.org');
export const UserTokenContext = createContext('');

import axios from 'axios'

const Providers = props => {
    const [currentUser, setCurrentUser] = useState({username: 'SelenaContent', password: 'eattheredpizza'});
    const [userToken, setUserToken] = useState('');
    const URL = useContext(URLContext);


    const getToken = async() => {
        console.log(currentUser);
        try {
          const response = await axios.post(`${URL}/wp-json/learnpress/v1/token`, currentUser)
          if(await validateToken(response.data.token) === 200){
            setUserToken(response.data.token);
            console.log("User token: ", userToken);
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
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
            <URLContext.Provider value={{URL}}>
                <UserTokenContext.Provider value={{ getToken, validateToken, userToken }}>
                    {props.children}
                </UserTokenContext.Provider>
            </URLContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default Providers;


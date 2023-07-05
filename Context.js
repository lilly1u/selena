import { createContext } from "react";

export const CurrentUserContext = createContext(null);
export const URIContext = createContext('https://myselena.org');
export const TokenContext = createContext(null);

// const Providers = ({children, user, setUser, URI, token}) => {
//     const URI = useContext(URIContext);
//     const token = useContext(TokenContext);
//     const [user, setUser] = useState({username: '', password: ''});

//     return (
//         <CurrentUserContext.Provider value={{user, setUser}}>
//             <URIContext.Provider value='https://myselena.org'>
//                 <TokenContext.Provider value={{token}}>
//                     {children}
//                 </TokenContext.Provider>
//             </URIContext.Provider>
//         </CurrentUserContext.Provider>
//     );
// }

// export default Providers;


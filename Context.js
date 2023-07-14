import { createContext } from "react";

export const CurrentUserContext = createContext(null);
export const URIContext = createContext('https://myselena.org');
export const TokenContext = createContext(null);

const Providers = ({children, user, URI, token}) => {
    return (
        <CurrentUserContext.Provider value={{user}}>
            <URIContext.Provider value='https://myselena.org'>
                <TokenContext.Provider value={{token}}>
                    {children}
                </TokenContext.Provider>
            </URIContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default Providers;


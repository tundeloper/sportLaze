import React, { createContext, ReactNode } from 'react';

interface ContextType {
    isAuthenticated: boolean;
    token?: null | string,
    logout: () => void;
    login: (token: string) => void
}

export const SportlazeContext = createContext<ContextType | undefined>(undefined);

export const SportlazeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [token, setTokekn] = React.useState<string | null>(null);

    // const login = () => {
    //     setIsAuthenticated(true)
    // };

    const logout = () => setIsAuthenticated(false);

    const login = (token: string) => {
        setTokekn(token)
    }

    // const value = { isAuthenticated: !!token, tokenHandler, login, token, logout }


    return (
        <SportlazeContext.Provider value={{ isAuthenticated: !!token, login, token, logout }}>
            {children}
        </SportlazeContext.Provider>
    );
};

export default SportlazeProvider
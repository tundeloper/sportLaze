import React, { createContext, ReactNode } from 'react';

interface ContextType {
    isAuthenticated: boolean;
    loading: boolean;
    errorMesssage: string | null;
    setError: (payload: string) => void,
    setLoading: (payload: boolean) => void,
    token?: null | string,
    logout: () => void;
    login: (token: string) => void
}

export const SportlazeContext = createContext<ContextType | undefined>(undefined);

export const SportlazeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isloading, setIsLoading] = React.useState(false);
    const [token, setTokekn] = React.useState<string | null>(null);
    const [message, setErrorMessage] = React.useState<string>('');

    const logout = () => {
        // setIsAuthenticated(false)
    };

    const login = (token: string) => {
        setTokekn(token)
    }

    const setLoading = (payload: boolean) => {
        setIsLoading(payload)
    }

    const setError = (payload: string) => {
        setErrorMessage(String)
    }
    // const value = { isAuthenticated: !!token, tokenHandler, login, token, logout }


    return (
        <SportlazeContext.Provider value={{ isAuthenticated: !!token, login, token, logout, loading: isloading, setLoading: setLoading, errorMesssage: message, setError }}>
            {children}
        </SportlazeContext.Provider>
    );
};

export default SportlazeProvider
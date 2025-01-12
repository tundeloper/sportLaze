import React, { createContext, ReactNode } from 'react';

interface ContextType {
    isAuthenticated: boolean;
    loading: boolean;
    snacksisOpen: boolean;
    setSnackIsOpen: (isOpen: boolean) => void
    disMesssage: {message: string, error: boolean};
    setMessage: (payload: {message: string, error: boolean}) => void,
    setLoading: (payload: boolean) => void,
    token?: null | string,
    logout: () => void;
    login: (token: string) => void
}

export const SportlazeContext = createContext<ContextType | undefined>(undefined);

export const SportlazeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isloading, setIsLoading] = React.useState(false);
    const [token, setTokekn] = React.useState<string | null>(null);
    const [message, setdisMessage] = React.useState<{message: string, error: boolean}>({message: '', error: false});
    const [opensnacks, setOpensnacks] = React.useState<boolean>(false);

    const logout = () => {
        // setIsAuthenticated(false)
    };

    const login = (token: string) => {
        setTokekn(token)
    }

    const setLoading = (payload: boolean) => {
        setIsLoading(payload)
    }

    const setMessage = (payload: {message: string, error: boolean}) => {
        setdisMessage(payload)
    }
    // const value = { isAuthenticated: !!token, tokenHandler, login, token, logout }


    return (
        <SportlazeContext.Provider value={{ isAuthenticated: !!token, login, token, logout, loading: isloading, setLoading: setLoading, disMesssage: message, setMessage : setMessage, snacksisOpen: opensnacks, setSnackIsOpen: (open: boolean) => setOpensnacks(open) }}>
            {children}
        </SportlazeContext.Provider>
    );
};

export default SportlazeProvider
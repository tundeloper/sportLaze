import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import getInitialTheme from "../utils/initialTheme";
import { initialUser, InitialUser, initialUserval, User } from "../utils/interface";

interface ContextType {
  isAuthenticated: boolean;
  loading: boolean;
  snacksisOpen: boolean;
  setSnackIsOpen: (isOpen: boolean) => void;
  disMesssage: { message: string; error: boolean };
  setMessage: (payload: { message: string; error: boolean }) => void;
  setLoading: (payload: boolean) => void;
  token?: null | string;
  logout: () => void;
  login: (token: string) => void;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  initailUser: InitialUser;
  setInitUser: Dispatch<SetStateAction<InitialUser>>;
}

export const SportlazeContext = createContext<ContextType | undefined>(undefined);

const TOKEN_EXPIRY_HOURS = 12; // Token expires in 12 hours

export const SportlazeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isloading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(getInitialTheme);
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("access_token");
    const storedExpiry = localStorage.getItem("token_expiry");

    if (storedToken && storedExpiry) {
      const expiryTime = parseInt(storedExpiry, 10);
      const currentTime = Date.now();

      if (currentTime > expiryTime) {
        // Token expired, remove it
        localStorage.removeItem("access_token");
        localStorage.removeItem("token_expiry");
        return null;
      }
      return storedToken;
    }
    return null;
  });

  const [message, setDisMessage] = useState<{ message: string; error: boolean }>({
    message: "",
    error: false,
  });
  const [opensnacks, setOpensnacks] = useState<boolean>(false);
  const [user, setUser] = useState<User>(initialUserval);
  const [initUser, setInitUser] = useState<InitialUser>(initialUser);

  // Sync theme mode with local storage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Save token with expiry time
  const login = (token: string) => {
    const expiryTime = Date.now() + 1 * 60 *  60 * 1000; // 24 hours
    setToken(token);
    localStorage.setItem("access_token", token);
    localStorage.setItem("token_expiry", expiryTime.toString());
  };

  // Remove token and expiry on logout
  const logout = () => {
    setToken(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_expiry");
  };

  // Check if token is expired on app load
  useEffect(() => {
    const interval = setInterval(() => {
      const storedExpiry = localStorage.getItem("token_expiry");
      if (storedExpiry) {
        const expiryTime = parseInt(storedExpiry, 10);
        if (Date.now() > expiryTime) {
          logout(); // Token expired, log user out
        }
      }
    }, 1000 * 60); // Check every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const setLoading = (payload: boolean) => {
    setIsLoading(payload);
  };

  const setMessage = (payload: { message: string; error: boolean }) => {
    setDisMessage(payload);
  };

  return (
    <SportlazeContext.Provider
      value={{
        isAuthenticated: !!token,
        user,
        setUser,
        initailUser: initUser,
        setInitUser,
        darkMode,
        setDarkMode,
        login,
        token,
        logout,
        loading: isloading,
        setLoading,
        disMesssage: message,
        setMessage,
        snacksisOpen: opensnacks,
        setSnackIsOpen: setOpensnacks,
      }}
    >
      {children}
    </SportlazeContext.Provider>
  );
};

export default SportlazeProvider;

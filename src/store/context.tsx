import React, { createContext, ReactNode, useEffect, useState } from "react";
import getInitialTheme from "../utils/initialTheme";
import {
  ContextType,
  initialUser,
  InitialUser,
  initialUserval,
  Post,
  User,
} from "../utils/interface";
import baseUrl from "../utils/baseUrl";

export const SportlazeContext = createContext<ContextType | undefined>(
  undefined
);

const TOKEN_EXPIRY_HOURS = 12; // Token expires in 12 hours
const url = baseUrl();

export const SportlazeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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

  const [message, setDisMessage] = useState<{
    message: string;
    error: boolean;
  }>({
    message: "",
    error: false,
  });
  const [opensnacks, setOpensnacks] = useState<boolean>(false);
  const [user, setUser] = useState<User>(initialUserval);
  const [initUser, setInitUser] = useState<InitialUser>(initialUser);
  const [posts, setPosts] = useState<Post[]>([]);

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
    const expiryTime = Date.now() + 1 * 60 * 60 * 1000; // 1 hours
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

    const getProfile = async (accessToken: string) => {
      console.log(accessToken);
      try {
        const response = await fetch(`${url}/auth/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log(response);

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setUser({
          username: data.username,
          name: data.name, // no name in the response
          email: data.email,
          date_of_birth: data.date_of_birth,
          followers: data.followers_count,
          following: data.following_count,
          favorite_sport: data.favorite_sport,
          favorite_team: data.favorite_team,
          formatted_join_date: data.formatted_join_date,
          formatted_member_since: data.formatted_member_since,
          location: data.location,
          id: data.id as string,
          bio: data.bio,
        });
        return data;
      } catch (error) {
        return null;
      }
    };
    getProfile(`${localStorage.getItem("access_token")}`).finally(() =>
      setLoading(false)
    );
   
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
        posts: posts,
        setPosts,
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

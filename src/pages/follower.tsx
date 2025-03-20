import { NavLink, useNavigate } from "react-router-dom";
import UserProfile from "../components/userProfile/profile";
import Follow from "../components/userProfile/follow";
import { Button, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { useSportlaze } from "../hooks/useContext";
import { User } from "../utils/interface";

export default function Follower() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{}[]>([]);
  const navigate = useNavigate();
  const url = baseUrl();
  const { user } = useSportlaze();

  const fetchFollowers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/profile/followers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }); // Fetch followers

      console.log('followers', response.data);
      setData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setError(error.response?.data?.detail || error.message);
        navigate("/auth", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowers();
  }, []);

  return (
    <UserProfile>
      <div className="flex gap-4 p-2">
        <Button onClick={() => navigate(-1)}>
          <ArrowBackIcon sx={{ color: "black" }} />
        </Button>
        <div className="flex flex-col">
          <span className="text-2xl font-bold dark:text-white">
            {user.name}
          </span>
          <span className="text-gray-500 mt-[-.5rem]">@{user.username}</span>
        </div>
      </div>
      <nav className="flex justify-between gap-4 px-4">
        <NavLink
          to="/followers"
          className={({ isActive }) =>
            `flex gap-4 font-bold pb-2 dark:text-white transition-all ${
              isActive && "border-b-[.3rem] border-secondary"
            }`
          }
        >
          Followers
        </NavLink>
        <NavLink
          to="/following"
          className={({ isActive }) =>
            `flex gap-4 font-bold pb-2 dark:text-white ${
              isActive && "border-b-[.3rem] border-secondary"
            }`
          }
        >
          Following
        </NavLink>
        <NavLink
          to="/verified-followers"
          className={({ isActive }) =>
            `flex gap-4 font-bold pb-2 dark:text-white ${
              isActive && "border-b-[.3rem] border-secondary"
            }`
          }
        >
          Verified Followers
        </NavLink>
      </nav>
      <div className="flex flex-col gap-4 p-4">
        {loading && (
          <div className="flex items-center pt-[3rem] justify-center mb-[2rem]">
            <CircularProgress size={30} />
          </div>
        )}
        {!loading && error && (
          <div className="text-center text-red-500">{error}</div>
        )}
        {!loading && !error && data.length === 0 ? (
          <div className="text-center text-4xl pt-[2rem] font-mono font-bold dark:text-white">
            Nothing to show here yet ___
            <p>follow someone</p>
          </div>
        ) : (
          data.map((follower: any, i: number) => <Follow follow={follower} key={i} />)
        )}
      </div>
    </UserProfile>
  );
}

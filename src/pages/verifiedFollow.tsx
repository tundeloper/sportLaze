import { NavLink } from "react-router-dom";
import UserProfile from "../components/userProfile/profile";
import Follow from "../components/userProfile/follow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import { User } from "../utils/interface";
import { useSportlaze } from "../hooks/useContext";

export default function FollowVerified() {
  const [data, setData] = useState<User[]>([])
  const navigate = useNavigate();
  const {darkMode} = useSportlaze()
  return (
    <UserProfile>
      <div className="flex gap-4 p-2">
        <Button onClick={() => navigate(-1)}>
          <ArrowBackIcon sx={{ color: `${darkMode ? "white" : "black"}` }} />
        </Button>

        <div className="flex flex-col">
          <span className="text-2xl font-bold dark:text-white">John Doe</span>
          <span className="text-gray-500 mt-[-.5rem]">#john doe</span>
        </div>
      </div>
      <nav className="flex justify-between gap-4 px-4">
        <NavLink
          to="/followers"
          className={({ isActive }) =>
            `flex gap-4 font-bold pb-2 dark:text-white ${
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
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Follow setFollow={setData} />
          ))}
      </div>
    </UserProfile>
  );
}

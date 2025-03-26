import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "../assets/home";
import LoungeIcon from "../assets/lounge";
import Share from "../assets/share";
import img from "../assets/logo gradient.svg";
import whitelogo from "../assets/whitelogo1.png";
import vid from "../assets/video icon.png";
import whitevid from "../assets/white video icon.png";
import { useSportlaze } from "../hooks/useContext";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import UserPost from "./userProfile/post";
import PostInput from "./layout/post";

const Landing = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { darkMode, setPosts, posts } = useSportlaze();
  const fill = darkMode ? "#d3d3d3" : "#2D439B";

  const API_URL = baseUrl();

  const getFeed = async (accessToken: string) => {
    try {
      const response = await axios.get(`${API_URL}/posts/feed`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data; // Return feed data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error fetching feed:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
      return null;
    }
  };

  const fetchFeed = async () => {
    setLoading(true);
    const token = localStorage.getItem("access_token"); // Get token from storage

    if (!token) {
      console.error("No access token found");
      setLoading(false);
      navigate("/auth", { replace: true });
      return;
    }

    const data = await getFeed(token);
    console.log(data);
    if (data) setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="relative">
      {/* <Button color="primary" className="fixed top-[25rem] bg-[red] z-50">
        <EditButton />
      </Button> */}
      <div className="flex justify-center mb-2">
        <img
          src={darkMode ? whitelogo : img}
          alt="sportlaze logo"
          className="h-[64px] w-[72px]"
        />
      </div>

      <nav className="flex sticky top-0 z-[6] justify-between">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `px-8 py-4 border-b-2 ${
              isActive && !darkMode ? "border-secondary" : ""
            }`
          }
        >
          <HomeIcon fill={fill} />
        </NavLink>
        <NavLink
          to={"/videos"}
          className={({ isActive }) =>
            `px-8 py-4 ${isActive && !darkMode ? "border-secondary" : ""}`
          }
        >
          <img src={darkMode ? whitevid : vid} alt="video icon" />
        </NavLink>
        <NavLink
          to={"/lounge"}
          className={({ isActive }) =>
            `px-8 py-4 ${isActive && !darkMode ? "border-secondary" : ""}`
          }
        >
          <LoungeIcon h={22} w={34} fill={fill} />
        </NavLink>
        <NavLink
          to={"/share"}
          className={({ isActive }) =>
            `px-8 py-4 ${isActive && !darkMode ? "border-secondary" : ""}`
          }
        >
          <Share fill={fill} />
        </NavLink>
      </nav>
      <div>
        {/* new posts */}
        <div className="flex justify-center items-center h-[2rem]">
          {/* <div className="flex bg-secondary py-2 px-4 items-center gap-1 rounded-[1rem]"><p className="gap-2 text-white text-[10px]">New Post</p><p><ArrowUp /></p></div> */}
        </div>

        <PostInput />

        {/* posts */}
        {/* {feed.length > 0 ? <p className="text-red-700">{feed[1].content}</p> : ''} */}
        {loading && (
          <div className="flex items-center justify-center mb-[2rem]">
            <CircularProgress size={30} />
          </div>
        )}
        {posts.map((item) => (
          <UserPost feed={item} key={item.id} />
        ))}
        
      </div>
    </div>
  );
};

export default Landing;

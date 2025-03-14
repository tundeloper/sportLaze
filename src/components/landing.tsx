import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "../assets/home";
import LoungeIcon from "../assets/lounge";
import Share from "../assets/share";
// import VideoIcon from "../assets/svgs/video icon"
import user from "../assets/evans avatar.png";
import AddIcon from "../assets/addBtn";
import ExpandGray from "../assets/expandButtonsGrey";
import post from "../assets/posted picture.png";
import LikeIcon from "../assets/like";
import SendIcon from "../assets/send";
import CommentIcon from "../assets/comment";
import img from "../assets/logo gradient.svg";
import whitelogo from "../assets/whitelogo1.png";
import Bookmarkicon from "../assets/bookmarkIcon";
import vid from "../assets/video icon.png";
import whitevid from "../assets/white video icon.png";
import { useSportlaze } from "../hooks/useContext";
import { Button } from "@mui/material";
import EditButton from "../assets/svgs/EditButton";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import UserPost from "./userProfile/post";
import PostInput from "./layout/post";
// import ArrowUp from "../assets/arrowUp"
// import logo fom '../'
// import Bookmark from "../assets/bookmark"
// import ArrowUp from "../assets/arrowUp"

export interface feedType {
  author_id: number;
  content: string;
  created_at: string;
  hashtags: string;
  id: number;
  likes_count: number;
}

const Landing = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [feed, setFeed] = useState<feedType[]>([]);
  const navigate = useNavigate();
  const { darkMode } = useSportlaze();
  const fill = darkMode ? "#d3d3d3" : "#2D439B";

  const API_URL = baseUrl();

  const getFeed = async (accessToken: string) => {
    try {
      const response = await axios.get(`${API_URL}/posts/feed`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Feed Data:", response.data); // Log the response
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
    if (data) setFeed(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  // if(loading) return <div>Loading...</div>

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
        {/* {navs.map(link => {
                return <NavLink key={link.name} to={link.path} className={({isActive}) => `p-4 ${isActive ? 'text-[red] border-b border-secondary' : 'text-[blue]'}`}>{link.icon}</NavLink>
            })} */}
      </nav>
      <div>
        {/* new posts */}
        <div className="flex justify-center items-center h-[2rem]">
          {/* <div className="flex bg-secondary py-2 px-4 items-center gap-1 rounded-[1rem]"><p className="gap-2 text-white text-[10px]">New Post</p><p><ArrowUp /></p></div> */}
        </div>

        <PostInput />

        {/* posts */}
        {/* {feed.length > 0 ? <p className="text-red-700">{feed[1].content}</p> : ''} */}
        {feed.map((item) => (
          <UserPost feed={item} />
        ))}

        <div className="flex w-full gap-4">
          <div className="w-[3.5-rem] h-[3.5rem]">
            <img src={user} alt="user" className="h-full w-full" />
          </div>
          <div className="w-[100%] mb-4">
            <div className="flex gap-4 items-center mb-2 ">
              <div className="flex gap-2 justify-between w-full">
                <div className="flex flex-col">
                  <p className="font-bold dark:text-white">Evans Patrick</p>{" "}
                  <p className="dark:text-white">@evansPatrick</p>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-secondary font-bold dark:text-white">
                    FOLLOW
                  </p>{" "}
                  <AddIcon />
                </div>
              </div>
              <div>{/* post */}</div>
              <div>
                <ExpandGray />
              </div>
            </div>
            <p className="mb-2 dark:text-white">
              🏆 Elevate your game with SportLaze!!!!! Connect, compete, and
              support your favourite team with a community that's as passionate
              as you are! 💪⚽️{" "}
              <span className="font-bold">#SportLaze #GameOn</span>
            </p>
            <div
              className="w-full gradient rounded-[1.5rem] mb-2"
              style={{ overflow: "hidden", height: "auto" }}
            >
              {/* img */}
              <img src={post} alt="post" className="w-full" />
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-4 ml-0 md-ml-2">
                <div className="flex gap-[4px] items-center">
                  <LikeIcon fill={darkMode ? "white" : "#33363F"} />{" "}
                  <p className="text-[13px] dark:text-white">15.3k</p>
                </div>
                <div className="flex gap-[4px] items-center">
                  <CommentIcon fill={darkMode ? "white" : "#33363F"} />{" "}
                  <p className="text-[13px] dark:text-white">15.3k</p>
                </div>
                <div className="flex gap-[1px] items-center">
                  <SendIcon fill={darkMode ? "white" : "#222222"} />{" "}
                  <p className="text-[13px] dark:text-white">15.3k</p>
                </div>
              </div>
              {/* Bookmark */}
              <div className="md: mr-2">
                <Bookmarkicon fill={darkMode ? "white" : "#222222"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

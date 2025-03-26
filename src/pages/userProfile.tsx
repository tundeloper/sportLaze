import { Avatar, Button, CircularProgress } from "@mui/material";
// import { LocationOn, CalendarToday, Link, CheckCircle } from "@mui/icons-material";
import UserProfile from "../components/userProfile/profile";
import userimg from "../assets/user/man-studio.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UserPost from "../components/userProfile/post";
import { useSportlaze } from "../hooks/useContext";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { Post } from "../utils/interface";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<
    "posts" | "replies" | "lounges" | "saved"
  >("posts");
  const { user, setMessage, loading, setLoading, disMesssage } = useSportlaze();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string>('');

  const url = baseUrl();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await axios.get(`${url}/posts/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(response.data);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.message === "Network Error") {
          setError("Your network seems to be down");
        } else {
          setError(error.response?.data.detail);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const tabClass = (tab: string) =>
    activeTab === tab
      ? "flex-1 py-2 border-b-2 border-[#463a85] font-semibold text-black-500 dark:text-darkw"
      : "flex-1 py-2 dark:text-darkw";

  return (
    <UserProfile>
      <div className="flex bg-gradient-to-b from-[#463a85] to-[#9a1b39] p-[-16px] w-full h-[10rem] relative">
        <div className="absolute" id="camera"></div>
        <Link
          to="/edit-profile"
          className="absolute top-4 right-[2rem] border !text-sm py-1 px-3 rounded-2xl !text-white !no-underline cursor-pointer"
        >
          Edit Profile
        </Link>
        <div className="flex justify-center items-center absolute right-[2rem] bottom-[-2rem] h-[6rem] w-[6rem] border rounded-[100%]">
          <Avatar src={userimg} sx={{ width: 93, height: 93 }} />
          {/* <Avatar src="https://avatars.githubusercontent.com/u/67442529?v=4" sx={{ width: 93, height: 93 }} /> */}
        </div>
      </div>
      <div className="px-2 py-2 dark:text-darkw">
        <div>
          <p className="font-semibold text-lg">{user.name}</p>
          <p className="text-gray-500 text-xs">@{user.username}</p>
        </div>
        <div className="">
          <div className="flex gap-[3rem] mt-2 dark:text-darkw">
            <Link to='/following'>
              Following <span className="ml-3 font-bold">{user.following}</span>
            </Link>
            <Link to='/followers'>
              Followers <span  className="ml-3 font-bold">{user.followers}</span>
            </Link>
          </div>
          <p className="mt-2">{user.bio}</p>
        </div>
        <div className="mt-2">
          <div className="flex">
            <span className="mr-4">
              <LocationOnOutlinedIcon />
            </span>{" "}
            <span>{user.location}</span>
          </div>
          <div className="flex mt-2 gap-4">
            <div className="flex">
              <span className="mr-4">
                <CalendarTodayOutlinedIcon />
              </span>{" "}
              <span>{user.formatted_join_date}</span>
            </div>
            <div className="flex">
              <span className="mr-4">
                <LinkOutlinedIcon sx={{ color: "#463a85" }} />
              </span>{" "}
              <Link to="/" className="text-[#463a85]">
                sportlaze.com
              </Link>
            </div>
          </div>
          <div className="flex mt-2">
            <span className="mr-4">
              <CalendarTodayOutlinedIcon />
            </span>{" "}
            <span>Since {user.formatted_join_date}</span>
          </div>
        </div>
        <nav className="mt-4 flex">
          <button
            onClick={() => setActiveTab("posts")}
            className={tabClass("posts")}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab("replies")}
            className={tabClass("replies")}
          >
            Replies
          </button>
          <button
            onClick={() => setActiveTab("lounges")}
            className={tabClass("lounges")}
          >
            Lounges
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={tabClass("saved")}
          >
            Saved
          </button>
        </nav>
        <section className="p-1 mt-3 md:p-4">
          {activeTab === "posts" && (
            <div className="min-h-[10rem]">
              {loading && <div className="flex justify-center pt-[2rem]"><CircularProgress size={30} /></div>}
              {error && <p className="text-red-500">{error}</p>}
              {posts.length === 0 && !loading && <p className="text-center text-4xl pt-[2rem] font-mono font-bold dark:text-white">No posts found<br/> Make A post and check back</p>}
              {posts.map((post: any) => (
                <UserPost feed={post} type />
              ))}
              
            </div>
          )}

          {/* replies */}
          {activeTab === "replies" && (
            <div className="min-h-[10rem]">
              <p className="text-gray-500 text-sm">Replies</p>
              <div className="mt-2">
                <p className="text-gray-700">
                  This is where the replies content will be shown.
                </p>
              </div>
            </div>
          )}
          
          {/* lounges */}
          {activeTab === "lounges" && (
            <div className="min-h-[10rem]">
              <p className="text-gray-500 text-sm">Lounges</p>
              <div className="mt-2">
                <p className="text-gray-700">
                  This is where the lounges content will be shown.
                </p>
              </div>
            </div>
          )}
          {activeTab === "saved" && (
            <div className="min-h-[10rem]">
              <p className="text-gray-500 text-sm">Saved</p>
              <div className="mt-2">
                <p className="text-gray-700">
                  This is where the saved content will be shown.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </UserProfile>
  );
};

export default Profile;

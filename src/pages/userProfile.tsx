import { Avatar, Button, CircularProgress } from "@mui/material";
// import { LocationOn, CalendarToday, Link, CheckCircle } from "@mui/icons-material";
import UserProfile from "../components/userProfile/profile";
import userimg from "../assets/user/man-studio.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserPost from "../components/userProfile/post";
import { useSportlaze } from "../hooks/useContext";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { Post, Repost, Userprofile } from "../utils/interface";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<
    "posts" | "replies" | "lounges" | "bookmarks"
  >("posts");
  const { user, loading, setLoading } = useSportlaze();
  const [posts, setPosts] = useState<Post[]>([]);
  const [reposts, setReposts] = useState<Repost[]>([]);
  const [profile, setUserProfile] = useState<Userprofile>();
  const [error, setError] = useState<string>("");

  const url = baseUrl();
  const { username } = useParams();
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const bookmark = searchParams.get('tab');

  useEffect(() => {
    fetchPosts();
    if(bookmark) {
      setActiveTab(bookmark as 'bookmarks')
    }
    if (user.username) {
          (async () => {
            try {
              const { data } = await axios.get(
                `${url}/social/reposts/user/${user.username}`
              );
              console.log(data, "repost");
              setReposts(data)
            } catch (error) {
              console.log(error);
            }
          })();
        }
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("No access token found");
      }

      const { data } = await axios.get(`${url}/profile/user/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await axios.get(`${url}/posts/user/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const val: Post[] = response.data;
      const SortedPost = val.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      console.log(SortedPost);
      setUserProfile(data);
      setPosts(SortedPost);
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

        {profile?.banner_image ? (
          <img
            src={profile?.banner_image}
            alt="Preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          ""
        )}
        {user.username === username && <Link
          to="/edit-profile"
          className="absolute bg-gradient-to-b from-[#463a85] to-[#9a1b39] top-4 right-[2rem] border !text-sm py-1 px-3 rounded-2xl !text-white !no-underline cursor-pointer"
        >
          Edit Profile
        </Link>}
        <div className="flex justify-center items-center absolute right-[2rem] bottom-[-2rem] h-[6rem] w-[6rem] border rounded-[100%]">
          {profile?.profile_picture ? (
            <Avatar
              src={profile.profile_picture}
              sx={{ width: 93, height: 93 }}
            />
          ) : (
            <Avatar sx={{ width: 93, height: 93 }}>
              {profile?.username && profile?.username[0].toLocaleUpperCase()}
            </Avatar>
          )}
          {/* <Avatar src="https://avatars.githubusercontent.com/u/67442529?v=4" sx={{ width: 93, height: 93 }} /> */}
        </div>
      </div>
      <div className="px-2 py-2 dark:text-darkw">
        <div>
          <p className="font-semibold text-lg">{user.username === username ? user.name : profile?.name}</p>
          <p className="text-gray-500 text-xs">@{user.username === username ? user.username : profile?.username}</p>
        </div>
        <div className="">
          <div className="flex gap-[3rem] mt-2 dark:text-darkw">
            
              {user.username === username ? (
                <Link to="/following">Following <span className="ml-3 font-bold">{user?.following}</span></Link>
              ) : (
                <Link to="#">Following<span className="ml-3 font-bold">{profile?.following_count}</span></Link>  
              )}
            
              {user.username === username ? (
                <Link to="/followers"> Follower <span className="ml-3 font-bold">{user?.followers}</span> </Link>
              ) : (
                <Link to={'#'}> Follower <span className="ml-3 font-bold">{profile?.followers_count}</span></Link>
              )}
          </div>
          <p className="mt-2">{user.username === username ? user.bio : profile?.bio}</p>
        </div>
        <div className="mt-2">
          <div className="flex">
            <span className="mr-4">
              <LocationOnOutlinedIcon />
            </span>
            <span>{user.name === username ? user.location : profile?.location}</span>
          </div>
          <div className="flex mt-2 gap-4">
            <div className="flex">
              <span className="mr-4">
                <CalendarTodayOutlinedIcon />
              </span>
              <span>Joined {user.username === username ? user.formatted_join_date : profile?.formatted_join_date}</span>
            </div>
            <div className="flex">
              <span className="mr-4">
                <LinkOutlinedIcon sx={{ color: "#463a85" }} />
              </span>
              {profile?.website ? (
                <Link to={profile.website} target="_blank">
                  {(() => {
                    try {
                      const urlWithProtocol = profile.website.startsWith("http")
                        ? profile.website
                        : `https://${profile.website}`;
                      const hostname = new URL(urlWithProtocol).hostname;
                      return `${hostname}`;
                    } catch {
                      return "";
                    }
                  })()}
                </Link>
              ) : (
                ""
              )}
              {/* {profile ? (
                <Link to={"#"}>{profile.website ? new URL(`${profile.website}`).hostname : ''}</Link>
              ) : (
                <Link to={"#"}>{new URL(`${user.website}`).hostname}</Link>
              )} */}
            </div>
          </div>
          {/* <div className="flex mt-2">
            <span className="mr-4">
              <CalendarTodayOutlinedIcon />
            </span>
            <span>Joined {user.username === username ? user.formatted_join_date : profile?.formatted_join_date}</span>
          </div> */}
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
            onClick={() => setActiveTab("bookmarks")}
            className={tabClass("bookmarks")}
          >
            Bookmarks
          </button>
        </nav>
        <section className="p-1 mt-3 md:p-4">
          {activeTab === "posts" && (
            <div className="min-h-[10rem]">
              {loading && (
                <div className="flex justify-center pt-[2rem]">
                  <CircularProgress size={30} />
                </div>
              )}
              {/* {error && <p className="text-red-500">{error}</p>} */}
              {posts.length === 0 && !loading &&  (
                <p className="text-center text-4xl pt-[2rem] font-mono font-bold dark:text-white">
                  No posts found
                  <br /> Make A post and check back
                </p>
              )}
              {posts.map((post: Post) => {
                return (
                  <UserPost
                    feed={post}
                    setPost={setPosts}
                    type
                    reposts={reposts}
                    setReposts={setReposts}
                    userProfile={profile}
                  />
                );
              })}
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
          {activeTab === "bookmarks" && (
            <div className="min-h-[10rem]">
              <p className="text-gray-500 text-sm">Bookmarks</p>
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

import React, { useEffect, useRef, useState } from "react";
import MessageIcon from "../../assets/messageIcon";
// import BarIcon from "../../assets/NavBar";
import NotIcon from "../../assets/notifications";
import SearchIcon from "../../assets/Search";
import SideBarIcon from "../../assets/sideBarIcon";
// import UserIcon from "../../assets/userIcon";
import SideNav from "./sideNav";
import { Link } from "react-router-dom";
import whiteImg from "../../assets/logoWhite.png";
// import UserPost from "../userProfile/post";
import PostInput from "./post";
import MUISnackbar from "../../utils/snackBar";
import {
  Avatar,
  Button,
  ClickAwayListener,
  Popover,
  // Typography,
} from "@mui/material";
import { useSportlaze } from "../../hooks/useContext";
import axios from "axios";
import baseUrl, { socketUrl } from "../../utils/baseUrl";
import { SearchType } from "../../utils/interface";
import { SearchLouge, SearchUser } from "./search";
// import { Search } from "@mui/icons-material";
import { Howl } from "howler";


const sound = new Howl({
  src: ["/notification.mp3"], 
  volume: 1,
});

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<boolean>(false);
  const [postOverlay, setPostOverlay] = useState<boolean>(false);
  const [seachMoadal, setSearchModal] = useState<boolean>(false);
  const [seachData, setSearchData] = useState<string>("");
  const [search, setSearch] = useState<SearchType>({
    lounges: [],
    users: [],
    hashtags: [],
  });
 
  // const [notifications, setNotifications] = useState<Notification[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [unreaMesaagecount, setUnreaMesaagecount] = useState<number>(0);
  const { logout, user, setNotifications } = useSportlaze();
  const url = baseUrl();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const token = localStorage.getItem("access_token");
  //
  useEffect(() => {
    socketRef.current = new WebSocket(socketUrl());

    socketRef.current.onopen = (event) => {
      console.log("✅ WebSocket connected");
      console.log("Socket ID:", event.currentTarget);
      setIsConnected(true);
    };

    socketRef.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        const eventType = message.event;
        const payload = message.data;

        switch (eventType) {
          case "notification":
            // console.log("🔔 Notification received:", payload);
            setNotifications((prev) => [payload, ...prev,]);
            break;
          case "unread_notifications":
            // console.log("📬 Unread notifications count:", payload);
            setUnreadCount(payload.count);
            // if(payload.count > 0) sound.play(); 
            break;

          case "direct_message":
            // console.log("📨 Direct message:", payload);
            // setMessages((prev) => [...prev, payload]);
            // if (payload.sender !== 'userId') sound.play();
            // if (payload.sender !== 'userId') sound.play();
            break;

          case "direct_message_sent":
            console.log("✅ Message sent:", payload);
            break;

          case "unread_messages":
            console.log("📥 Unread messages count:", payload);
            setUnreaMesaagecount(payload.count);
            // if(payload.count > 0) sound.play();
            break;

          default:
            console.warn("⚠️ Unknown event type:", eventType, payload);
        }
      } catch (err) {
        console.error("❌ Error parsing WebSocket message:", event.data);
      }
    };

    // socketRef.current.onmessage = (event) => {
    //   console.log('📨 Message:', event);
    //   setMessages(prev => [...prev, event.data]);
    // };

    socketRef.current.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    socketRef.current.onclose = (event) => {
      console.warn("🔌 WebSocket closed:", event.reason);
      setIsConnected(false);
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  useEffect(() => {
    // Only search if query is not empty
    if (seachData.trim() === "") {
      setSearch({hashtags: [], lounges: [], users: []});
      return;
    }

    // Clear the previous timeout
    // if (typingTimeout) {
    //   clearTimeout(typingTimeout);
    // }

    // Set a new timeout for 5 seconds
    const timeout = setTimeout(() => {
      searchUsers(seachData);
      setSearchModal(false);
    }, 1000);

    // setTypingTimeout(timeout);

    // Cleanup on unmount or when query changes
    return () => clearTimeout(timeout);
  }, [seachData]);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const { data } = await axios.get(`${url}/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(data);
        if (data) setNotifications([...data]);
      } catch (error) {
        console.log(error, "unable to read unread message count");
      }
    };

    fetchNotification();
  }, [])  
  // notificatication;

  const searchUsers = async (searchTerm: string) => {
    try {
      const limit = 10;
      const { data } = await axios.get(`${url}/search/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          query: searchTerm,
          limit,
        },
      });
      if (data) {
        setSearch(data)
        setSearchModal(true);
      };
      console.log("Users fetched:", data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {profile && (
        <div
          className="w-screen h-screen fixed top-0 bg-transparent"
          style={{ zIndex: "100" }}
          onClick={() => {
            setProfile(false);
          }}
        ></div>
      )}
      <div>
        <MUISnackbar />

        <div className="flex sticky z-[100] top-0 justify-between items-center p-4 gradient sm:p-5">
          <SideNav
            profile={profile}
            setIsVisible={setProfile}
            setPostOverlay={setPostOverlay}
          />
          {postOverlay && (
            <div
              className="bg-[#4e5257a8] h-[100vh] w-[100vw] flex justify-center items-center absolute -z-[100] top-0 left-0 "
              onClick={(e) => {
                setPostOverlay(false);
                setProfile(false);
                e.stopPropagation();
              }}
            >
              <div
                className="min-h-[20rem] min-w-[35rem]"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <PostInput />
              </div>
            </div>
          )}

          <div className="flex items-center gap-6 sm:gap-[6rem]">
            <div style={{ cursor: "pointer" }} onClick={() => setProfile(true)}>
              <SideBarIcon />
            </div>
            <div className="relative">
              <input
                type="text"
                className="w-[13rem] text-secondary p-2 pl-8 sm:w-[18rem]"
                placeholder="Search Sportlaze"
                style={{
                  borderRadius: "1.2rem",
                  outline: "none",
                  paddingRight: "4.5rem",
                }}
                onChange={(e) => setSearchData(e.target.value)}
                // onClick={() => {setSearchModal(true)}}
              />
              <div style={{ position: "absolute", top: "10px", left: "8px" }}>
                <SearchIcon />
              </div>
              <div style={{ position: "absolute", top: "2.5px", right: "0" }}>
                <button
                  className="gradient text-[.8rem] font-semibold rounded-full px-3 py-2"
                  onClick={() => {
                    setSearchModal(true);
                    searchUsers(seachData);
                  }}
                >
                  Search
                </button>
              </div>
              {/* Seach */}
              {seachMoadal && (
                <ClickAwayListener
                  onClickAway={() => {
                    setSearchModal(false);
                  }}
                >
                  <div className="h-auto w-[25rem] max-h-[30rem] absolute left-[-2rem] bg-black mt-2 rounded-md overflow-y-scroll shadow-lg p-2 dark:bg-white">
                    {/* FOR user */}
                    {search.users.length > 0 ? (
                      search.users.map((user) => {
                        return <SearchUser key={user.id} user={user} />;
                      })
                    ) : (
                      <p className="text-[white] text-[.8rem] font-semibold">
                        {null}
                      </p>
                    )}
                    {search.lounges.length > 0 ? (
                      search.lounges.map((lounge) => {
                        return <SearchLouge key={user.id} lounge={lounge} />;
                      })
                    ) : (
                      <p className="text-[white] text-[.8rem] font-semibold">
                        {null}
                      </p>
                    )}
                  </div>
                </ClickAwayListener>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative mr-2" style={{ borderRadius: "10rem" }}>
              {/* <Link to='/'><BarIcon /></Link> */}
              <Link to="/">
                <img src={whiteImg} alt="logo" className="w-[2.5rem]" />
              </Link>
            </div>
            <Link to="/messages"
              className="p-[10px] bg-primary relative"
              style={{ borderRadius: "10rem" }}
            >
              <MessageIcon />
              {isConnected && unreaMesaagecount > 0 && (
                <div
                  className="flex justify-center items-center bg-[white] text-[red] text-[10px] w-4 h-4"
                  style={{
                    position: "absolute",
                    top: "-.6rem",
                    right: "-.3rem",
                    borderRadius: "2rem",
                  }}
                >
                  {unreaMesaagecount}
                </div>
              )}
            </Link>
            <Link
              to="/notifications"
              className="p-2 bg-primary relative"
              style={{ borderRadius: "10rem" }}
            >
              <NotIcon />
              {isConnected && unreadCount > 0 && (
                <div
                  className="flex justify-center items-center bg-[white] text-[red] text-[10px] w-4 h-4"
                  style={{
                    position: "absolute",
                    top: "-.6rem",
                    right: "-.3rem",
                    borderRadius: "2rem",
                  }}
                >
                  {unreadCount}
                </div>
              )}
            </Link>
            <section
              aria-describedby={id}
              onClick={handleClick}
              style={{ padding: "0", margin: "0" }}
            >
              <div
                className="hidden bg-primary sm:block"
                style={{ borderRadius: "10rem" }}
              >
                {user.profile_picture ? (
                  <Avatar
                    src={user.profile_picture}
                    sx={{ width: 40, height: 40 }}
                  />
                ) : (
                  <Avatar sx={{ width: 40, height: 40 }}>
                    {user.username && user.username[0].toLocaleUpperCase()}
                  </Avatar>
                )}
              </div>
            </section>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <div className="flex flex-col items-center p-2">
                <Link
                  to={`/user/${user.username}`}
                  style={{ color: "gray", textTransform: "capitalize" }}
                >
                  View profile
                </Link>
                <Button
                  sx={{ p: 0, color: "gray", textTransform: "capitalize" }}
                  onClick={logout}
                >
                  Log Out
                </Button>
              </div>
            </Popover>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;

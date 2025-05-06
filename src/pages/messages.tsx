import React, { useEffect, useRef, useState } from "react";

import { Howl } from "howler";
import UserProfile from "../components/userProfile/profile";
import axios from "axios";
import baseUrl, { socketUrl } from "../utils/baseUrl";
import { useSportlaze } from "../hooks/useContext";
import ConversationList from "../components/messages/conversationList";
import { conversation, User } from "../utils/interface";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

// const sound = new Howl({
//   src: ["/notification.mp3"],
//   volume: 1,
// });

const Messages = () => {
  const [profile, setProfile] = useState<boolean>(false);
  const [postOverlay, setPostOverlay] = useState<boolean>(false);
  const [sportlazeuser, setSportlazeuser] = useState<User[]>([]);
  const [conversation, setConversation] = useState<conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [seachData, setSearchData] = useState<string>("");

  // const [notifications, setNotifications] = useState<Notification[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const { logout, user, setNotifications } = useSportlaze();
  const url = baseUrl();

  const token = localStorage.getItem("access_token");
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
            setNotifications((prev) => [payload, ...prev]);
            break;
          case "unread_notifications":
            break;

          case "direct_message":
            console.log("📨 Direct message:", payload);
            // setMessages((prev) => [...prev, payload]);
            // if (payload.sender !== 'userId') sound.play();
            // if (payload.sender !== 'userId') sound.play();
            break;

          case "direct_message_sent":
            console.log("✅ Message sent:", payload);
            break;

          case "unread_messages":
            console.log("🔔 Unread messages:", payload);
            // if(payload.count > 0) sound.play();
            break;

          default:
            console.warn("⚠️ Unknown event type:", eventType, payload);
        }
      } catch (err) {
        console.error("❌ Error parsing WebSocket message:", event.data);
      }
    };

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
    if (seachData.trim() === "") {
      setSportlazeuser([]);
      return;
    }
    (async () => {
      if (seachData.trim() === "") {
        setSportlazeuser([]);
        return;
      }
      try {
        const users = await axios.get(`${url}/search/users`, {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            query: seachData,
            limit: 5,
          },
        });
        setSportlazeuser(users.data as User[]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [seachData]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${url}/message/dm/conversations`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setConversation(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            logout();
          } else {
            console.error("Error fetching messages:", error.response?.data);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);
  // notificatication;

  return (
    <UserProfile>
      <div className="p-2">
        <h1 className="text-2xl font-bold text-black">Messages</h1>
        <input
          type="text"
          className="w-full bg-secondary text-white p-2 pl-4"
          placeholder="Search users"
          style={{
            borderRadius: "1.2rem",
            outline: "none",
            paddingRight: "4.5rem",
          }}
          onChange={(e) => setSearchData(e.target.value)}
          // onClick={() => {setSearchModal(true)}}
        />
      </div>
      <div className="p-2">
        {sportlazeuser.length > 0 &&
          sportlazeuser.map((user) => {
            return (
              <Link to={`/messages/${user.id}`}>
                <div
                  key={user.id}
                  className="max-w-full flex items-center mb-3 mx-auto p-4 bg-white rounded-lg shadow-md"
                >
                  <Avatar src={user.profile_picture} />
                  {/* <img
                src={user.profile_picture}
                alt="profile"
                className="w-10 h-10 rounded-full"
              /> */}
                  <div className="flex flex-col ml-3">
                    <span className="text-sm font-semibold text-black">
                      {user.name}
                    </span>
                    <span className="text-sm font-semibold text-gray-500">
                      @{user.username}
                    </span>
                    <span className="text-xs ">{user.bio}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        {conversation.length > 0
          ? conversation.map((conversation) => (
              <ConversationList
                key={conversation.user_id}
                conversation={conversation}
              />
            ))
          : `${loading ? "Loading..." : "No conversations found"}`}
        {/* <ConversationList /> */}
      </div>
    </UserProfile>
  );
};

export default Messages;

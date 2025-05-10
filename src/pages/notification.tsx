// import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import UserProfile from "../components/userProfile/profile";
import generateSocketId from "../utils/generateSocketId";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import {
  Bell,
  Heart,
  MessageCircle,
  Repeat2,
  UserPlus,
  Quote,
} from "lucide-react";
import { useSportlaze } from "../hooks/useContext";
import { Link } from "react-router-dom";
import { Notification } from "../utils/interface";

const token = localStorage.getItem("access_token");

const notificationIcons = {
  like: <Heart className="text-pink-500" />,
  comment: <MessageCircle className="text-blue-500" />,
  repost: <Repeat2 className="text-green-500" />,
  follow: <UserPlus className="text-purple-500" />,
  quote_repost: <Quote className="text-yellow-500" />,
  message: <Bell className="text-gray-500" />,
};

export default function Notifications() {
  // const [notifications, setNotifications] = useState([]);
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string>("");

  //     type WebSocketEvent =
  //   | { type: 'notification'; payload: NotificationPayload }
  //   | { type: 'unread_notifications'; payload: NotificationPayload }
  //   | { type: 'direct_message'; payload: NotificationPayload }
  //   | { type: 'direct_message_sent'; payload: NotificationPayload }
  //   | { type: 'unread_messages'; payload: number };

  // interface NotificationPayload {
  //   id: number;
  //   title: string;
  //   message: string;
  //   created_at: string;
  //   // ...other fields
  // }

  // const socket = io(`lazeapi-v1.onrender.com`, {
  //   auth: { token },
  // });

  // const socketUrl =
  //   'wss://lazeapi-v1.onrender.com/ws?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMywiZXhwIjoxNzQ2MjY4NzY3fQ.tylQvgaca43vAcnf29ZFZUDqEXr_BtEr_hYakqVOy_U&socket_id=test_socket_123';
  const socketUrl = `wss://lazeapi-v1.onrender.com/ws?token=${token}&socket_id=${generateSocketId()}`;
  const { notifications } = useSportlaze();

  useEffect(() => {
    socketRef.current = new WebSocket(socketUrl);

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
            console.log("🔔 Notification received:", payload);

            break;
          case "unread_notifications":
            console.log("📬 Unread notifications count:", payload);
            setMessages(payload.count);
            break;

          case "direct_message":
            console.log("📨 Direct message:", payload);
            break;

          case "direct_message_sent":
            console.log("✅ Message sent:", payload);
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
    const markAsRead = async () => {
      try {
        const response = await axios.post(
          `${baseUrl()}/notifications/read-all`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Notifications marked as read:", response.data);
        } else {
          console.error("Failed to mark notifications as read:", response);
        }
      } catch (error) {
        console.log("Error marking notifications as read:", error);
      }
    };
    markAsRead();
  }, []);

  console.log("Notifications:", notifications);

  const redirectNot = (not: Notification ): string => {
    if(not.type === 'message') return `/messages/${not.sender_id}`
    if(not.type === 'like') return `/post/${not.reference_id}`
    if(not.type === "comment") return `/post/${not.reference_id}`
    return '#'
  }

  return (
    <UserProfile>
      {/* <p>Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}</p> */}
      <div className="p-3">
        {notifications.map((not) => (
          <Link to={redirectNot(not)}>
          <div
            className={`flex mb-3 items-start gap-3 p-4 rounded-xl shadow-sm hover:bg-gray-100 transition ${
              not.is_read ? "bg-white" : "bg-blue-50"
            }`}
          >
            <img
              src={not.sender_profile_picture}
              alt={`${not.sender_name} profile`}
              className="w-10 h-10 rounded-full"
            />

            <div className="flex-1">
              <div className="flex items-center gap-2">
                {/* {notificationIcons[not.type] || <Bell />} */}
                {/* {not.type in notificationIcons ? notificationIcons[not.type] : <Bell className="text-gray-500" />} */}
                <Bell className="text-gray-500" />
                <p className="text-sm text-gray-800">@{not.sender_username}</p>
              </div>
              <p className="text-sm font-semibold text-gray-800">
                {not.content}
              </p>
              {/* <p className="text-xs text-gray-500">{new Date(not.created_at).toLocaleString()}</p> */}
            </div>

            {!not.is_read && (
              <span className="w-2 h-2 bg-blue-500 rounded-full self-center" />
            )}
          </div>
          </Link>
        ))}
      </div>
      {/* <h1>Notifications</h1> */}
    </UserProfile>
  );
}

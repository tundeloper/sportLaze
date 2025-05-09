import { useParams } from "react-router-dom";
import Chat from "../components/messages/chat";
import UserProfile from "../components/userProfile/profile";
import { useEffect, useRef, useState } from "react";
import baseUrl, { socketUrl } from "../utils/baseUrl";
import axios from "axios";
import { chats } from "../utils/interface";
// import groupMessagesByDate from "../utils/groupmessages";

const UserChat = () => {
  // const [chats, setChats] = useState<[string, chats[]][]>([]);
  const [chats, setChats] = useState<chats[]>([]);

  const [input, setInput] = useState("");

  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const { user_id } = useParams();
  const token = localStorage.getItem("access_token");
  const API_URL = baseUrl();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/message/dm/get/${user_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // const grouped = groupMessagesByDate(data);
        // const dateGroups = Object.entries(grouped).sort(
        //   ([a], [b]) =>
        //     new Date(grouped[b][0].created_at).getTime() -
        //     new Date(grouped[a][0].created_at).getTime()
        // );
        // console.log("Grouped chats:", dateGroups);
        // setChats(dateGroups);
        setChats(data.reverse() as chats[]);
      } catch (error) {
        console.error("Error fetching feed:", error);
      }
    })();
  }, [chats, user_id, token, API_URL]);

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
          case "direct_message":
            setChats((prev) => [...prev, payload]);
            // console.log("📨 Direct message:", payload);
            // setMessages((prev) => [...prev, payload]);
            // if (payload.sender !== 'userId') sound.play();
            // if (payload.sender !== 'userId') sound.play();
            break;

          case "direct_message_sent":
            console.log("✅ Message sent:", payload);
            setChats((prev) => [...prev, payload]);
            break;

          case "unread_messages":
            console.log("📥 Unread messages count:", payload);
            // setUnreaMesaagecount(payload.count);
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

  const sendMessage = async () => {
    if (!input.trim()) return;

    //send message to the server
    try {
      const { data } = await axios.post(
        `${API_URL}/message/dm/send`,
        {
          recipient_id: user_id,
          content: input,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInput("");

      console.log("Message sent:", data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    // Update the chat state with the new message
  };

  return (
    <UserProfile>
      <div className="flex h-screens">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {/* {chats.map(([date, messages]) => (
              <div key={date} className="mb-4">
                <div className="text-lg text-center flex justify-center items-centerrounded-sm mb-2">
                  <p className=" bg-primary text-white rounded-md px-2 py-1">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  </p>
                </div>
                {messages.map((message) => (
                  <Chat key={message.id} chat={message} />
                ))}
              </div>
            ))} */}

            {chats.map((chat) => (
              <Chat key={chat.id} chat={chat} />
            ))}
          </div>
          <div className="p-4 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border rounded px-3 py-2"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </UserProfile>
  );
};

export default UserChat;

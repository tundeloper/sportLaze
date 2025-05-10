import { useEffect, useRef } from "react";
import { chats } from "../../utils/interface";
import { useParams } from "react-router-dom";

// Replace with your actual socket URL function
// const socketUrl = () => "ws://localhost:3000";


const Chat: React.FC<{ chat: chats }> = ({ chat }) => {
  // const [userId, setUserId] = useState<string>(crypto.randomUUID());
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { user_id } = useParams();


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <div
        className={`max-w-xs p-2 rounded-lg ${
          user_id && chat.sender_id !== +user_id
            ? "ml-auto bg-secondary text-white"
            : "mr-auto bg-gray-200 text-black"
        }`}
      >
        <p>{chat.content}</p>
        <span className={`text-xs text-gray-500 ${
          user_id && chat.sender_id !== +user_id
            ? "ml-auto text-white"
            : "mr-auto text-gray-500"
        }`}>
          {new Date(chat.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <div ref={messagesEndRef} />
    </>
  );
};

export default Chat;

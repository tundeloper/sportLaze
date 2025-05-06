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
            ? "ml-auto bg-blue-500 text-white"
            : "mr-auto bg-gray-200 text-black"
        }`}
      >
        {chat.content}
      </div>
      <div ref={messagesEndRef} />
    </>
  );
};

export default Chat;

import { Avatar } from "@mui/material";
import { formatFullDate } from "../../utils/format-date";
import { conversation } from "../../utils/interface";
import { Link } from "react-router-dom";

const ConversationList: React.FC<{conversation: conversation}> = ({conversation}) => {
    
      
    return (
        
      <div className="max-w-full mx-auto p-2 bg-white rounded-lg shadow-md mb-3">
        <Link to={`/messages/${conversation.user_id}`}>
        {/* {messages.map((msg) => ( */}
          <div
            className="flex items-start gap-3 py-3 border-b last:border-none"
          >
            <Avatar src={conversation.profile_picture}/>

            {/* <img
              src={conversation.profile_picture}
              alt={`${conversation.name}'s avatar`}
              className="w-10 h-10 rounded-full object-cover"
            /> */}
            <div className="flex-1 mt-2">
              <div className="flex justify-between text-sm text-gray-600">
                <div>
                <span className="font-semibold text-black truncate max-w-[60%]">
                  {conversation.name}
                </span>
                <span className="ml-4">{formatFullDate(conversation.latest_message.created_at)}</span>
                </div>
                {conversation.unread_count > 0 && <span className="bg-primary rounded-full p-1 w-min h-min text-white font-semibold">{conversation.unread_count}</span>}
              </div>
              <div className="text-sm text-gray-600 truncate">
                {conversation.latest_message.content}
              </div>
            </div>
          </div>
          </Link>
      </div>
    );
  };
  
  export default ConversationList;
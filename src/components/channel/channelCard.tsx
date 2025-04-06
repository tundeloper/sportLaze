import { MoreHoriz } from "@mui/icons-material";
import { Avatar, AvatarGroup, Button, Card, IconButton } from "@mui/material";
import { channelType } from "../../utils/interface";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";

export const ChannelCard: React.FC<{
  name: string;
  description: string;
  is_private: boolean;
  id: 0;
  lounge_id: number;
  created_at: string;
  created_by: string;
  member_count: 0;
  avatars: string[];
}> = ({ name, avatars, is_private, member_count, id }) => {
  const url = baseUrl();
  const token = localStorage.getItem("access_token")

  const join_channel = async () => {
    try {
      const { data } = await axios.post(`${url}/channels/${id}/join`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className="p-4 border border-secondary rounded-xl shadow-sm w-[37rem]"
      style={{ borderWidth: ".1rem" }}
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold text-gray-900 dark:text-gray-300">
          {name}{" "}
          <span className="text-gray-500">
            • {is_private ? "Private" : "Public"}
          </span>
        </p>
        <IconButton>
          <MoreHoriz className="text-gray-600 cursor-pointer" />
        </IconButton>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="flex">
            {avatars.map((avatar: string) => (
              <Avatar
                sizes="20"
                alt="User 1"
                src="/user1.jpg"
                className="ml-[-.5rem] border border-white border-3"
              >
                {avatar}
              </Avatar>
            ))}
          </div>
          <p className="text-black">{member_count} active</p>
        </div>
        <Button
          variant="outlined"
          sx={{
            textTransform: "capitalize",
            borderColor: "#463a85",
            borderRadius: "1rem",
            color: "black",
            borderWidth: ".1rem",
          }}
          className="px-4 py-2 text-sm font-medium0"
          onClick={join_channel}
        >
          <p className="dark:text-gray-50">
            {is_private ? "sending request" : "join"}
          </p>
        </Button>
      </div>
    </div>
  );
};

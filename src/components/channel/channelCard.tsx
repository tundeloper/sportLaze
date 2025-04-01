import { MoreHoriz } from "@mui/icons-material";
import { Avatar, AvatarGroup, Button, Card, IconButton } from "@mui/material";

export const ChannelCard = ({ name, type, active, avatars, request }: any) => (
  <div className="p-4 border border-secondary rounded-xl shadow-sm w-[37rem]" style={{borderWidth: '.1rem'}}>
    <div className="flex items-center justify-between">
      <p className="font-semibold text-gray-900 dark:text-gray-300">
        Premier League Match <span className="text-gray-500">• Private</span>
      </p>
      <IconButton>
        <MoreHoriz className="text-gray-600 cursor-pointer" />
      </IconButton>
    </div>
    <div  className="flex items-center justify-between">
      <div className="flex gap-4 items-center">
        <div className="flex">{avatars.map((avatar: any) => <Avatar sizes="20" alt="User 1" src="/user1.jpg" className="ml-[-.5rem] border border-white border-3" >{avatar}</Avatar>)}</div>
        <p className="text-black">{active} active</p>
      </div>
      <Button variant="outlined" sx={{textTransform: 'capitalize', borderColor: '#463a85', borderRadius: '1rem', color: 'black', borderWidth: '.1rem'}} className="px-4 py-2 text-sm font-medium0">
          <p className="dark:text-gray-50">{request ? "sending request" : "join"}</p>
        </Button>
    </div>

  </div>
);

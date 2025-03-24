import { Avatar, Button, Card } from "@mui/material";

const ChannelCard = ({ name, type, active, avatars, request }: any) => (
    <Card className="flex flex-col md:flex-row justify-between items-center p-4 rounded-lg shadow-sm border w-full">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-500">{type} • {active} active</p>
        </div>
        <div className="flex -space-x-2">
          {avatars.map((avatar: string, index: number) => (
            <Avatar key={index} className="w-8 h-8 text-xs">{avatar}</Avatar>
          ))}
        </div>
      </div>
      <Button variant="outlined" className="mt-2 md:mt-0">
        {request ? "Send request" : "Join"}
      </Button>
    </Card>
  );
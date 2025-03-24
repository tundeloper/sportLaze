import React from "react";
import { Button, Card, Avatar, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Layout from "./layout/layout";

const channels = [
  {
    name: "Premier League Match",
    type: "Private",
    active: "5k",
    avatars: ["A", "B", "C"],
    request: true,
  },
  {
    name: "Bundesliga Updates",
    type: "Public",
    active: "50k",
    avatars: ["D", "E", "F"],
    request: false,
  },
  {
    name: "Champions League Live",
    type: "Public",
    active: "5k",
    avatars: ["G", "H", "I"],
    request: false,
  },
  {
    name: "Pre-Match Analysis (Spanish)",
    type: "Private",
    active: "15k",
    avatars: ["J", "K"],
    request: true,
  },
];

const ChannelCard = ({ name, type, active, avatars, request }: any) => (
  <Card className="flex flex-col md:flex-row justify-between items-center p-4 rounded-lg shadow-sm border w-full">
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <div>
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-gray-500">
          {type} • {active} active
        </p>
      </div>
      <div className="flex -space-x-2">
        {avatars.map((avatar: string, index: number) => (
          <Avatar key={index} className="w-8 h-8 text-xs">
            {avatar}
          </Avatar>
        ))}
      </div>
    </div>
    <Button variant="outlined" className="mt-2 md:mt-0">
      {request ? "Send request" : "Join"}
    </Button>
  </Card>
);

const ChannelsList = () => {
  return (
    <div className="p-2 max-w-4xl border bottom-3 border-secondary rounded-lg md:mx-auto shadow-md md:p-6 bg-white dark:bg-black">
      <div className="flex flex-col mx-auto md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-bold mb-3">Top Trending</h2>
        <TextField
          placeholder="Search channels"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          className="w-full md:w-64 dark:bg-white"
        />
      </div>
      <div className="space-y-4">
        {channels.map((channel, index) => (
          <ChannelCard key={index} {...channel} />
        ))}
      </div>
    </div>
  );
};

const Sidebar = () => (
  <div className="flex h-fit flex-col p-4 space-y-4 md:w-1/4">
    <Button
      variant="outlined"
      className="flex gap-2 rounded-full"
      sx={{ borderRadius: "100rem", textTransform: "capitalize" }}
    >
      <span>+ </span>
      <span>Create Channels</span>
    </Button>
    <Button
      variant="outlined"
      className="flex gap-2"
      sx={{ borderRadius: "100rem", textTransform: "capitalize" }}
    >
      <span>➔</span>
      <span>Join Channels</span>
    </Button>
    <Button
      variant="outlined"
      className="flex gap-2"
      sx={{ borderRadius: "100rem", textTransform: "capitalize" }}
    >
      <span>≡</span>
      <span>My Channels</span>
    </Button>
  </div>
);

const TrendingChannelsPage = () => {
  return (
    <Layout>
      <div className="flex min-h-[100vh] bg-white flex-col md:flex-row gap-6 p-6  dark:bg-black">
        <Sidebar />
        <ChannelsList />
      </div>
    </Layout>
  );
};

export default TrendingChannelsPage;

import { InputAdornment, TextField } from "@mui/material";
import { ChannelCard } from "./channelCard";
import SearchIcon from "../../assets/Search";


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


export const ChannelsList = () => {
  return (
    <div className="p-2 border px-6 py-4 border-secondary w-[45rem] rounded-xl md:mx-auto shadow-md md:p- dark:bg-black" style={{borderWidth: '.1rem'}}>
      <div className="flex flex-col mx-auto md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl text-black font-bold mb-3 dark:text-white">Top Trending</h2>
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
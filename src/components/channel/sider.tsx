import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate()
  const {channelId} = useParams()

    return <div className="flex h-fit flex-col p-4 space-y-4 md:w-1/4">
      <Button
        variant="outlined"
        className="flex gap-2 rounded-full border-2"
        sx={{ borderRadius: "100rem", textTransform: "capitalize", borderColor: "#463a85", borderWidth: '.1rem', color:"#463a85"}}
        onClick={() => {navigate(`/lounge/create-channel/${channelId}`)}}
      >
        <span>+ </span>
        <span>Create Channels</span>
      </Button>
      <Button
        variant="outlined"
        className="flex gap-2 text-secondary"
        sx={{ borderRadius: "100rem", textTransform: "capitalize", borderColor: "#463a85", borderWidth: '.1rem', color:"#463a85" }}
      >
        <span>➔</span>
        <span>Join Channels</span>
      </Button>
      <Button
        variant="outlined"
        className="flex gap-2"
        sx={{ borderRadius: "100rem", textTransform: "capitalize", borderColor: "#463a85", borderWidth: '.1rem', color:"#463a85"}}
      >
        <span>≡</span>
        <span>My Channels</span>
      </Button>
    </div>
};
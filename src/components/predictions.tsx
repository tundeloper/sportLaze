import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Typography } from "@mui/material";

const matches = [
  {
    team1: "Brighton & Hove Albion",
    team2: "Manchester City",
    logo1: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Brighton_%26_Hove_Albion_logo.svg/800px-Brighton_%26_Hove_Albion_logo.svg.png",
    logo2: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/800px-Manchester_City_FC_badge.svg.png",
    time: "17:50",
    date: "Sunday, 27 October",
  },
  {
    team1: "Brighton & Hove Albion",
    team2: "Manchester City",
    logo1: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Brighton_%26_Hove_Albion_logo.svg/800px-Brighton_%26_Hove_Albion_logo.svg.png",
    logo2: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/800px-Manchester_City_FC_badge.svg.png",
    time: "17:50",
    date: "Sunday, 27 October",
  },
];

const LiveScore: React.FC = () => {
  return (
    <div className="gradient mb-4 rounded-[.5rem] py-3" style={{background: "linear-gradient(to top, #3b0768, #881273)",}}>
        <div className="flex justify-center w-full bg-white"><h1 className="font-bold text-secondary">PREDICTIONS</h1></div>
    <Carousel
      indicators={true} // Enable pagination dots
      navButtonsAlwaysVisible={false}
      animation="slide"
      autoPlay={false} 
      duration={500}
      navButtonsAlwaysInvisible={true}
      activeIndicatorIconButtonProps={{
          style: { color: '#fff'}
      }}
    >
      {matches.map((match, index) => (
        <Box
          key={index}
          sx={{
            // background: "linear-gradient(to top, #3b0768, #881273)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            padding: "20px",
            minHeight: "250px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <Box component="img" src={match.logo1} alt={match.team1} sx={{ width: 70, height: 70 }} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              VS
            </Typography>
            <Box component="img" src={match.logo2} alt={match.team2} sx={{ width: 70, height: 70 }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: "bolder", marginBottom: "10px" }}>
            {match.time}
          </Typography>
          <Typography variant="subtitle1" sx={{textTransform: "uppercase"}}>{match.date}</Typography>
        </Box>
      ))}
    </Carousel>
    </div>
  );
};

export default LiveScore;
import React from "react";
import Carousel from "react-material-ui-carousel";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Typography } from "@mui/material";
import PremierLeagueLogo from "../assets/premierLeagueLogo";
import { useSportlaze } from "../hooks/useContext";

const LiveScore : React.FC = () => {
//   const responsive = {
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 1,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 1,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//     },
//   };

const {darkMode} = useSportlaze()
const fill = darkMode ? 'white' : '#3E0F51'

  const slides = [
    {
      team1: {
        name: "West Ham",
        logo: "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg",
        score: 2,
        scorers: ["Mohammed Kudus, 28'", "Michail Antonio, 85'"],
      },
      team2: {
        name: "Wolves",
        logo: "https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg",
        score: 2,
        scorers: ["Mohammed Kudus, 28'", "Michail Antonio, 85'"],
      },
      time: "88:58",
      period: "2nd Half",
    },
    {
      team1: {
        name: "Liverpool",
        logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
        score: 1,
        scorers: ["Salah, 45+'"],
      },
      team2: {
        name: "Manchester City",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Brighton_%26_Hove_Albion_logo.svg/800px-Brighton_%26_Hove_Albion_logo.svg.png",
        score: 3,
        scorers: ["Haaland, 12'", "De Bruyne, 60'", "Foden, 78'"],
      },
      time: "76:23",
      period: "2nd Half",
    },
    {
      team1: {
        name: "Chelsea",
        logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
        score: 0,
        scorers: [],
      },
      team2: {
        name: "Arsenal",
        logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
        score: 2,
        scorers: ["Odegaard, 15'", "Saka, 63'"],
      },
      time: "90:00",
      period: "Full Time",
    },
  ];

  return (
    <Box className="bg-white overflow-hidden rounded-[1rem] shadow-md h-[23rem] dark:bg-[black] max-w-sm mx-auto mb-4">
      <Typography variant="h6" className="text-center font-bold text-white gradient p-[1.2rem]">
        LIVE SCORE
      </Typography>

      {/* <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        showDots
        renderDotsOutside
        containerClass="carousel-container"
      > */}
      <Carousel
            indicators={true} // Enable pagination dots
            navButtonsAlwaysVisible={false}
            animation="slide"
            autoPlay={false} 
            duration={500}
            activeIndicatorIconButtonProps={{
                style: { color: '#463a85'}
            }}
        >
        {slides.map((slide, index) => (
          <Box key={index} className="p-5 bg-white dark:bg-[black] rounded-lg h-[100%]" >
            {/* Team Logos */}
            <Box className="flex justify-between items-center">
              <Box className="flex flex-col items-center">
                <img
                  src={slide.team1.logo}
                  alt={`${slide.team1.name} Logo`}
                  className="h-16 w-16 rounded-full"
                />
                <Typography variant="body2" className="text-gray-600 mt-1">
                  {/* {slide.team1.name} */}
                </Typography>
              </Box>

              {/* <img
                src="https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg"
                alt="Premier League Logo"
                className="h-10 w-10"
              /> */}
              <div className="h-10 w-10">
                <PremierLeagueLogo fill={fill}/>
              </div>

              <Box className="flex flex-col items-center">
                <img
                  src={slide.team2.logo}
                  alt={`${slide.team2.name} Logo`}
                  className="h-16 w-16 rounded-full"
                />
                <Typography variant="body2" className="text-gray-600 mt-1">
                  {/* {slide.team2.name} */}
                </Typography>
              </Box>
            </Box>

            {/* Scores */}
            <Box className="flex px-5 justify-between items-center mt-4">
              <Typography
                variant="h4"
                className="font-bold text-secondary shadow-lg w-[2rem] text-center rounded-lg dark:text-white"
                style={{fontWeight: 'bolder'}}
              >
                {slide.team1.score}
              </Typography>
              <Box className="text-center">
                <Typography
                  variant="body2"
                  className="text-purple-600 font-semibold dark:text-white"
                >
                  {slide.period}
                </Typography>
                <Typography
                  variant="h6"
                  className="text-red-600 font-bold dark:text-white"
                >
                  {slide.time}
                </Typography>
              </Box>
              <Typography
                variant="h4"
                className="font-bold text-secondary shadow-lg w-[2rem] text-center rounded-lg dark:text-white"
                style={{fontWeight: 'bolder'}}
              >
                {slide.team2.score}
              </Typography>
            </Box>

            {/* Scorers */}
            <Box className="grid grid-cols-2 mt-4 text-center text-gray-600 text-sm">
              <Box>
                {slide.team1.scorers.map((scorer, idx) => (
                  <Typography style={{fontSize: '11px'}}  key={idx} variant="body2" className="text-sm dark:text-white">
                    {scorer}
                  </Typography>
                ))}
              </Box>
              <Box>
                {slide.team2.scorers.map((scorer, idx) => (
                  <Typography style={{fontSize: '11px'}} key={idx} variant="body2" className="text-sm dark:text-white">
                    {scorer}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default LiveScore;
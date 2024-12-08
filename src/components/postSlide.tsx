import React from "react";
import Carousel from "react-material-ui-carousel";
import { Card, CardContent, Avatar, Typography, Box, } from "@mui/material";

const slides = [
  {
    id: 1,
    avatar: "https://via.placeholder.com/150",
    name: "Evans Patrick",
    handle: "@Evanspatrick",
    text: "I'm predicting a thrilling match with Man City edging out Brighton 3-1. City's attacking firepower is hard to contain, but Brighton will definitely put up a fight! What are your thoughts?",
  },
  {
    id: 2,
    avatar: "https://via.placeholder.com/150",
    name: "Jessica Doe",
    handle: "@JessieDoe",
    text: "Brighton will surprise everyone, mark my words! A close match, but 2-2 for me.",
  },
  {
    id: 3,
    avatar: "https://via.placeholder.com/150",
    name: "Alex Smith",
    handle: "@AlexTheAnalyst",
    text: "City’s midfield is their strongest weapon. They’ll win 3-0 without trouble!",
  },
];

const PostSlider = () => {
    const FixedHeight = '190px'
  return (
    <Box
      sx={{
        mx: "auto", // Center the slider horizontally
        paddingBottom: 2,
        // p: 2,
        overflow: 'hidden',
        borderRadius: 2,
        // boxShadow: 2,
        border: '2px solid #463a85'
      }}
    >
      <Carousel
        indicators={true} // Enable pagination dots
        navButtonsAlwaysVisible={false}
        animation="slide"
        autoPlay={true} 
        duration={500}
        navButtonsAlwaysInvisible={true}
        activeIndicatorIconButtonProps={{
            style: { color: '#463a85'}
        }}
      >
        {slides.map((slide) => (
          <Card key={slide.id} sx={{ borderRadius: 3, textAlign: "left", boxShadow: 0, height: FixedHeight}}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  src={slide.avatar}
                  alt={slide.name}
                  sx={{ width: 50, height: 50 }}
                />
                <Box ml={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {slide.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {slide.handle}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.primary">
                {slide.text}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Carousel>
      {/* <Button>Enter Channel</Button> */}
    </Box>
  );
};

export default PostSlider;
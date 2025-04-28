import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../components/layout/layout";
import gradimg from "../assets/logo gradient.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useSportlaze } from "../hooks/useContext";
import copyicon from "../assets/promotion/lucide_copy-plus.svg";
import createAds from "../assets/promotion/ic_round-add.svg";
import deleteIcon from "../assets/promotion/material-symbols_delete-outline-rounded.svg";
import uploadicon from "../assets/promotion/material-symbols_upload.svg";
import promotionIcon from "../assets/promotion/promotion-icon.svg";
import { NavLink } from "react-router-dom";

export const AdsTarget = () => {
  const { user } = useSportlaze();

  const [location, setLocation] = useState("Country-USA");
  const [gender, setGender] = useState("Any");
  const [age, setAge] = useState("Any");

  return (
    <Layout>
      <section id="adsTarget" className="bg-[rgb(249,244,244)] pt-3">
        <img src={gradimg} alt="sportlaze logo" className="ml-6" />
        <Box
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          minHeight="100vh"
          bgcolor="#f9f4f4"
          gap={4}
        >
          {/* Sidebar */}
          <div className="text-[blue] p-6 flex flex-col">
            <NavLink
              to="/promotion"
              className={({ isActive }) =>
                `pl-1 mb-2 border-l-4 ${isActive ? "border-[blue]" : ""}`
              }
            >
              Post Details
            </NavLink>
            <NavLink
              to="/ads-target"
              className={({ isActive }) =>
                `pl-1 mb-2 border-l-4 ${isActive ? "border-[blue]" : ""}`
              }
            >
              Ads Target
            </NavLink>
            <NavLink
              to="/payment"
              className={({ isActive }) =>
                `pl-1 mb-2 border-l-4 ${isActive ? "border-[blue]" : ""}`
              }
            >
              Payment
            </NavLink>
          </div>

          {/* Main Content */}
          <Box
            flex={1}
            border={3}
            borderColor={"gray"}
            bgcolor={"white"}
            sx={{ maxWidth: "60rem", borderRadius: "1rem" }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={3}
              borderColor={"gray"}
              padding={2}
              mb={3}
            >
              <Typography variant="h5" fontWeight="600" color="primary">
                Ad Target
              </Typography>
            </Box>

            <div className="flex flex-col lg:flex-row gap-6 p-6 mb-8">
              {/* Left Section */}
              <Card className="flex-1 p-4 ">
                <CardContent className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      Ads Targeting
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Ads automatically target audiences relevant to your ad
                      campaign and there is no manual work required from you.
                    </p>
                  </div>

                  {/* Location */}
                  <FormControl fullWidth>
                    <InputLabel>Location</InputLabel>
                    <Select
                      value={location}
                      label="Location"
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <MenuItem value="Country-USA">Country - USA</MenuItem>
                      {/* Add more locations here if needed */}
                    </Select>
                  </FormControl>

                  {/* Gender */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Gender
                    </label>
                    <div className="flex gap-2">
                      {["Any", "Male", "Female"].map((option) => (
                        <Button
                          key={option}
                          variant={gender === option ? "contained" : "outlined"}
                          onClick={() => setGender(option)}
                          className="flex-1"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Age
                    </label>
                    <div className="flex gap-2">
                      <Button
                        variant={age === "Any" ? "contained" : "outlined"}
                        onClick={() => setAge("Any")}
                        className="flex-1"
                      >
                        Any
                      </Button>
                      <TextField
                        placeholder="Age Range"
                        size="small"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Right Section */}
              <Card className="w-full lg:w-80 p-4">
                <CardContent className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-gray-500 mb-2">Audience Estimate</p>
                  <p className="text-3xl font-bold">6.3M–9.3M</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Based on your targeting selections, this is the estimated
                    size of your audience over 30 days.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderTop={3}
              borderColor={"gray"}
              padding={2}
            >
              <Typography color="primary">Back</Typography>
              <Box display="flex" gap={2} fontSize="0.9rem">
                <Button
                  variant="text"
                  sx={{
                    color: "#1976d2",
                    textTransform: "capitalize",
                    textDecoration: "underline",
                  }}
                >
                  Exit
                </Button>

                <Button
                  variant="text"
                  sx={{
                    color: "#1976d2",
                    textTransform: "capitalize",
                    // textDecoration: "underline",
                    padding: "1rem",
                    border: "1px solid #1976d2",
                    borderRadius: "2px",
                  }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </section>
    </Layout>
  );
};

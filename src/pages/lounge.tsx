import Layout from "../components/layout/layout";
import logo from "../assets/logoWhite.png";
import LoungeIcon from "../assets/lounge";
import TopLounges from "../components/topLounges";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import LoungeCard from "../components/loungeCard";
import FilterIcon from "../assets/svgs/filter";
import SearchIcon from "../assets/Search";
import soccer from "../assets/svgs/soccer.png";
import { useSportlaze } from "../hooks/useContext";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { url } from "inspector";
import { LoungeType } from "../utils/interface";
import { loadavg } from "os";
// import SearchIcon from "../assets/Search"

const Lounge = () => {
  const lounges = [
    { name: "Golf", stats: "990k", image: soccer },
    { name: "MMA", stats: "990k", image: soccer },
    { name: "Cycling", stats: "990k", image: soccer },
    { name: "Formula Race", stats: "990k", image: soccer },
    { name: "Golf", stats: "990k", image: soccer },
    { name: "MMA", stats: "990k", image: soccer },
    { name: "Cycling", stats: "990k", image: soccer },
    { name: "Formula Race", stats: "990k", image: soccer },
    { name: "Golf", stats: "990k", image: soccer },
    { name: "MMA", stats: "990k", image: soccer },
    { name: "Cycling", stats: "990k", image: soccer },
    { name: "Formula Race", stats: "990k", image: soccer },
    { name: "Golf", stats: "990k", image: soccer },
    { name: "MMA", stats: "990k", image: soccer },
    { name: "Cycling", stats: "990k", image: soccer },
    { name: "Formula Race", stats: "990k", image: soccer },
  ];

  const [topLounges, setTopLounges] = useState<LoungeType[]>([]);
  const [Loading, setLoading] = useState(false);

  const { darkMode } = useSportlaze();
  const url = baseUrl();

  useEffect(() => {
    // Fetch lounges from the API
    // setTopLounges(lounges);
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${url}/lounges/`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        console.log(data);
        setTopLounges(data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching lounges:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (Loading) {
    return <div className="flex justify-center items-center h-screen"></div>;
  }

  return (
    <div style={{ overflowX: "hidden" }}>
      <Layout>
        {/* (to top, black, #322f2fd9, #cdc9f13e),  gradient mask dark*/}
        <div
          className={`w-full h-[auto] bg-contain ${
            darkMode ? "gradient-mask-dark" : "gradient-mask"
          } dark:bg-[black]`}
        >
          <div className="flex gap-4 pt-4 justify-center items-center flex-col">
            <img
              src={logo}
              alt="white sportlaze logo"
              className="w-[auto] h-[5rem] mb-2"
            />
            <div
              className="flex gap-4 rounded-xl items-center justify-between px-10 py-4 w-"
              style={{ border: "2px solid white" }}
            >
              <div className="w-1rem[]">
                <LoungeIcon h={30} w={60} />
              </div>
              <h1 className="font-bold text-[1.5rem] md:text-[1.8rem]">
                Lounge
              </h1>
            </div>
            {Loading ? (
              <CircularProgress size={30} />
            ) : (
              <div className="w-[100vw]">
                <TopLounges topLounges={topLounges} />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center w-[100vw] min-h-[100vh - 15rem] items-center bg-white dark:bg-[black] pb-10">
          <Box className="p-2  border-0 border-primary ml-0 rounded-lg pr-[-4px] text-black max-w-[930px] sm:p-4 sm:mx-4 lg:mx-[10%] sm:border-2 w-full dark:border-white">
            <Box className="flex justify-between mb-3 px-0 sm:px-5">
              <Typography
                className="text-[#463a85] dark:text-white"
                variant="h5"
                style={{ fontWeight: "bold" }}
              >
                Lounges
              </Typography>
              {/* Search and Filters */}
              <Box className="flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    className="w-[13rem] text-secondary p-2 pl-8 sm:w-[18rem]"
                    placeholder="Search Lounges"
                    style={{
                      borderRadius: "1.3rem",
                      outline: "none",
                      background: "#dcdcdc",
                    }}
                  />
                  <div
                    style={{ position: "absolute", top: "10px", left: "8px" }}
                  >
                    <SearchIcon />
                  </div>
                </div>
                <IconButton>
                  <FilterIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Grid Layout */}
            <Box
              className="grid grid-cols-2 gap-2 rounded-lg py-2 px-0 overflow-y-scroll overflow-x-hidden custom-scrollbar sm:px-5 sm:grid-cols-3 md:grid-cols-4"
              style={{ maxHeight: "500px" }}
            >
              {topLounges.map((lounge, index) => {
                if (Loading) {
                  return <CircularProgress key={index} size={30} />;
                }          
                return <LoungeCard {...lounge} key={index} />
              })}
            </Box>
          </Box>
        </div>
      </Layout>
    </div>
  );
};

export default Lounge;

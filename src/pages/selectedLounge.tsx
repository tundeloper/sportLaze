import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/layout/layout";
import VideoIcon from "../assets/lounge/video";
import PredictionIcon from "../assets/lounge/predictions";
import SportNewsIcon from "../assets/lounge/sportNews";
import LeagueIcon from "../assets/lounge/leaguetableicon";
import LivesScoreIcon from "../assets/lounge/liveScoreIcon";
import ChannelIIcon from "../assets/lounge/channelIcon";
import ChallengeIcon from "../assets/lounge/challengeIcon";
import HeartIcon from "../assets/lounge/heart";
import logo from "../assets/whitelogo.png";
import InfoIcon from "../assets/lounge/infoIcon";
import { LoungeType } from "../utils/interface";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { CircularProgress } from "@mui/material";

const LoungeId = () => {
  const { slug } = useParams();

  const [lounge, setLounge] = useState<LoungeType | null>(null);
  const [loading, setLoading] = useState(false);
  const url = baseUrl();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${url}/lounges/${slug}`);
        const response = await axios.post(`${url}/lounges/${data?.id}/join`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        console.log(response.data);
        setLounge(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  

  // const soccerImage = () => {
  //   const loungeName = slug?.toLocaleLowerCase();
  //   if (loungeName === "soccer") {
  //     return soccer;
  //   } else if (loungeName === "basket ball") {
  //     return basketBall;
  //   } else if (loungeName === "the nfl") {
  //     return nfl;
  //   } else if (loungeName === "hockey") {
  //     return hockey;
  //   }
  // };
  return (
    <Layout>
      <div className="bg-[#F9F2F2] dark:bg-[black]">
        {/* Header Section */}
        <header className="relative text-white">
          <div
            className="relative flex justify-beween h-[25rem]"
            style={{ overflow: "hidden", background: "rgb(0, 12, 234)" }}
          >
            <img
              className="h-[10rem] w-auto absolute right-0 bottom-[-1rem] z-20"
              src={logo}
              alt={slug}
              style={{}}
            />
            {loading ? (
              <CircularProgress />
            ) : (
              <div
                className="w-full h-full absolute left-0 top-0 z-10 bg-[blue]"
                style={{
                  background:
                    "linear-gradient(to right, #463a85, #463a85, transparent, transparent)",
                }}
              >
                <div className="mt-[5rem] max-w-7xl m-auto py-10 px-6 flex flex-col md:flex p-8 relative">
                  <div className="md:w-1/2">
                    <h1 className="text-5xl font-bold mb-4">{lounge?.name}</h1>
                    <div className="flex items-center gap-3">
                      <InfoIcon />
                      <p className="text-lg">{`${lounge?.description}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div
              className="w-[70%] h-[full] ml-[30%] relative overflow-hidden rounded-xl bg-cover bg-center flex items-end shadow-lg bg-gradient-to-t from-secondary/90 to-primary text-white hover:scale-105 transition-transform"
              style={{
                backgroundImage: `
                linear-gradient(to right, #5f4de2, rgba(105, 27, 154, 0.41), rgba(154, 27, 80, 0.41)),
                url('${lounge?.icon}')`,
                // backgroundSize: '50rem 30rem',
                backgroundRepeat: "no-repeat",
                outline: "none",
                border: "0px",
                float: "right",
              }}
            ></div>
          </div>
          {/* <div className="max-w-7xl m-auto h-[25rem] flex flex-col md:flex items-center p-8 relative z-10">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-4">{lounge}</h1>
            <div className="flex items-center gap-3">
              <InfoIcon />
              <p className="text-lg">
                {`Explore the world of ${lounge?.toLocaleLowerCase() === "the nfl" ? 'The National Football League' : lounge}, build your interest, and connect
              with other lovers of the sport.`}
              </p>
            </div>
          </div>
        </div> */}

          {/* Background Image with Fade */}
          <div
            className="absolute flex justify-between inset-0 w-full h-full bg-cover bg-no-repeat bg-left"
            style={{
              // backgroundImage: `url(${ball})`,
              overflow: "hidden",
            }}
          >
            {/* <div className="absolut left-0 gradient-r h-full w-full from-blue-800 via-blue-800/80 to-red z-4"></div> */}
            {/* <img className="h-[40rem] w-auto right-0"  src={ball} alt={lounge} style={{transform: 'translateY(-1.5rem)', opacity: '0.6', float: 'right'}}/> */}
          </div>
        </header>

        {/* Grid Section */}
        <section className="max-w-7xl mx-auto py-10 px-6 bg-[#F9F2F2] dark:bg-[black]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { name: "Live Score", icon: <LivesScoreIcon />, href: '/livesscore' },
              { name: "Channels", icon: <ChannelIIcon />, href: `/channels/${lounge?.id}` },
              { name: "Bet Predictions", icon: <PredictionIcon />, href: '/betprediction' },
              { name: "Sport Dating", icon: <HeartIcon />, href: 'sport-dating' },
              { name: "Trending Videos", icon: <VideoIcon />, href: 'trending-videos' },
              { name: `${lounge?.name} News`, icon: <SportNewsIcon />, href: `${lounge?.name}` },
              { name: "Create Challenges", icon: <ChallengeIcon />, href: 'create-challenges' },
              { name: "League Information", icon: <LeagueIcon />, href: 'league-information' },
            ].map((item, index) => (
              <Link to={item.href} key={index}>
              <div
                key={index}
                className="flex justify-between items-center bg-white text-secondary shadow-md rounded-lg p-3 text-center hover:bg-blue-100 transition"
                style={{ border: "2px solid rgb(36, 15, 137)" }}
              >
                <h2 className="text-sm font-semibold w-[4px] sm:text-lg">
                  {item.name}
                </h2>
                <div className="text-sm">{item.icon}</div>
              </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default LoungeId;

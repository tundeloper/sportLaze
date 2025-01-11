import React from "react"
import { useParams } from "react-router-dom"
import Layout from "../components/layout/layout"
import ball from '../assets/lounge/soccer.png'
import VideoIcon from "../assets/lounge/video"
import PredictionIcon from "../assets/lounge/predictions"
import SportNewsIcon from "../assets/lounge/sportNews"
import LeagueIcon from "../assets/lounge/leaguetableicon"
import LivesScoreIcon from "../assets/lounge/liveScoreIcon"
import ChannelIIcon from "../assets/lounge/channelIcon"
import ChallengeIcon from "../assets/lounge/challengeIcon"
import HeartIcon from "../assets/lounge/heart"
import InfoIcon from "../assets/lounge/infoIcon"

const LoungeId = () => {
  const { lounge } = useParams()
  return <Layout>
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center p-8 relative z-10">
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
        </div>

        {/* Background Image with Fade */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-no-repeat bg-left"
          style={{
            backgroundImage: `url(${ball})`, // Replace with your image URL
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-blue-800/80 to-transparent"></div>
        </div>
      </header>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[
            { name: "Live Score", icon: <LivesScoreIcon /> },
            { name: "Channels", icon: <ChannelIIcon /> },
            { name: "Bet Predictions", icon: <PredictionIcon /> },
            { name: "Sport Dating", icon: <HeartIcon /> },
            { name: "Trending Videos", icon: <VideoIcon /> },
            { name: "Sport News", icon: <SportNewsIcon /> },
            { name: "Create Challenges", icon: <ChallengeIcon /> },
            { name: "League Information", icon: <LeagueIcon /> },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white text-secondary shadow-md rounded-lg p-6 text-center hover:bg-blue-100 transition"
              style={{ border: '2px solid #463a85' }}
            >
              <h2 className="text-lg font-semibold w-[4px]">{item.name}</h2>
              <div className="text-3xl mb-4">{item.icon}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  </Layout>
}

export default LoungeId
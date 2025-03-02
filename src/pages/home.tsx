import Trends from "../components/Trends";
import Lounge from "../components/lounges";
import Fixture from "../components/Fixture";
// import img from '../assets/logo gradient.svg'
// import whitelogo from '../assets/whitelogo1.png'
import Landing from "../components/landing";
import PostSlider from "../components/postSlide";
import Layout from "../components/layout/layout";
import Predictions from "../components/predictions";
import LiveScore from "../components/livesscore";
import { useSportlaze } from "../hooks/useContext";
import { useEffect, useState } from "react";

const Home = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { initailUser, setUser } = useSportlaze();

  const getProfile = async (accessToken: string) => {
    try {
      const response = await fetch(
        `https://lazeapi-v1.onrender.com/v1/auth/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      console.log(data, "data");
      return data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    // if (!token) {
    //     console.error("No access token found");
    //     setLoading(false);
    //     return;
    // }
    // check if user is authenticated by checking local storage
    // if there is no token, logout and redirect to login page

    if (initailUser.access_token.length > 0 && initailUser.access_token) {
      getProfile(initailUser.access_token)
        .then((data) => {
          console.log(data);
          setUser({
            username: data.username,
            name: '', // no name in the response
            email: data.email,
            date_of_birth: data.date_of_birth,
            followers: data.followers_count,
            following: data.following_count,
            favorite_sport: data.favorite_sport,
            favorite_team: data.favorite_team,
            formatted_join_date: data.formatted_join_date,
            formatted_member_since: data.formatted_member_since,
            location: data.location,
            id: data.id as string,
            bio: null,
          });
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, []);

  // const { darkMode } = useSportlaze()

  return (
    <div
      className="w-screen relative bg-[#dbd2d2] h-screen dark:bg-[#4a4646]"
      style={{ overflowX: "hidden" }}
    >
      <Layout>
        <div
          className="flex w-full flex-row-reverse text-black lg:flex-row"
          style={{ overflow: "hidden" }}
        >
          <div className="w-[35%] hidden m-2 lg:block">
            <Trends />
            <Lounge />
          </div>
          <div className="bg-white w-full h-[auto] p-4 sm: w-full dark:bg-[black] sm:rounded-[1rem]">
            {/* <div className="flex justify-center mb-2"><img src={darkMode ? whitelogo : img} alt="sportlaze logo" className="h-[64px] w-[72px]" /></div> */}
            <Landing />
          </div>
          <div className="w-[40%] hidden m-2 sm:block">
            <Fixture />
            <LiveScore />
            <div className="bg-white w-full p-2 rounded-[1rem] dark:bg-[black]">
              <Predictions />
              <PostSlider />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;

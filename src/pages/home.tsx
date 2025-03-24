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
import baseUrl from "../utils/baseUrl";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loadings/loading";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useSportlaze();

  const navigate = useNavigate();
  const url = baseUrl();

  const getProfile = async (accessToken: string) => {
    console.log(accessToken)
    try {
      const response = await fetch(`${url}/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

       console.log(response)

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setUser({
        username: data.username,
        name: data.username, 
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
        bio: data.bio,
      });
      return data;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    // check if user is authenticated by checking local storage
    // if there is no token or token expires, logout and redirect to auth page
    const token = localStorage.getItem("access_token"); // Get token from storage

    if (!token) {
      console.error("No access token found");
      setLoading(false);
      navigate("/auth", { replace: true });
      return;
    }
    

    if (token.length > 0 && token) {
      getProfile(token)
        .then((data) => {
          console.log(data, 'user profile')
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, []);

  // const { darkMode } = useSportlaze()

  if (loading) return <Loading />

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
          <div className="bg-white h-[auto] p-4 sm: w-full dark:bg-[black] sm:rounded-[1rem]">
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

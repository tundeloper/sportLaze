import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Trends from "../components/Trends"
import Lounge from "../components/lounges"
import Fixture from "../components/Fixture"
import img from '../assets/logo gradient.svg'
import Landing from "../components/landing"
import PostSlider from "../components/poatSlide"
import LiveScore from "../components/predictions"
import Layout from "../components/layout/layout"

const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
    // navigate('/auth')
    }, [navigate])

    return <div className="w-screen relative bg-[#dbd2d2] h-screen" style={{overflowX: 'hidden'}}>
        <Layout>
        <div className="flex w-full flex-row-reverse text-black lg:flex-row" style={{overflow: 'hidden'}}>
            <div className="w-[35%] hidden m-2 lg:block">
                <Trends />
                <Lounge />
            </div>
            <div className="bg-white w-full h-[auto] p-4 sm: w-full sm:rounded-[1rem]">
                <div className="flex justify-center mb-2"><img src={img} alt="gradient" /></div>
                <Landing />
            </div>
            <div className="w-[40%] hidden m-2 sm:block">
                <Fixture />
                <div className="bg-white w-full p-2 rounded-[1rem]">
                    <LiveScore />
                    <PostSlider />
                </div>
            </div>
        </div>
        </Layout>
    </div>
}

export default Home
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Trends from "../components/Trends"
import Lounge from "../components/lounges"
import Fixture from "../components/Fixture"
import NotIcon from "../assets/notifications"
import MessageIcon from "../assets/messageIcon"
import BarIcon from "../assets/NavBar"
import SearchIcon from "../assets/Search"
import SideBarIcon from "../assets/sideBarIcon"
import UserIcon from "../assets/userIcon"
import img from '../assets/logo gradient.svg'
import Landing from "../components/landing"
import Profile from "../components/profile"
import PostSlider from "../components/postSlide"
import LiveScore from "../components/predictions"

const Home = () => {
    const [profile, setProfile] = useState<boolean>(false)
    const navigate = useNavigate()
    useEffect(() => {
    // navigate('/auth')
    }, [navigate])

    return <div className="w-screen relative bg-[#dbd2d2] h-screen" style={{overflowX: 'hidden'}}>
        <Profile profile={profile} setIsVisible={setProfile}/>
        <div className="flex sticky top-0 justify-between items-center p-4 bg-[red] gradient z-[2] sm:p-6">
            <div className="flex items-center gap-6 sm:gap-12">
            <div style={{cursor: 'pointer'}} onClick={() => setProfile(true)}><SideBarIcon /></div>
            <div className="relative">
                <input type="text" className="w-[13rem] text-secondary p-2 pl-8 sm:w-[18rem]" placeholder="Search Sportlaze" style={{borderRadius: '1rem', outline: 'none'}} />
                <div style={{position: 'absolute', top: '10px', left: '6px'}}><SearchIcon /></div>
            </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="p-2 hidden bg-primary relative sm:block" style={{borderRadius: '10rem'}}>
                    <BarIcon />
                </div>
                <div className="p-2 bg-primary relative" style={{borderRadius: '10rem'}}>
                    <MessageIcon />
                    <div className="flex justify-center items-center bg-[white] text-[red] text-[10px] w-4 h-4" style={{position: "absolute", top: '-.6rem', right: '-.3rem', borderRadius: '2rem'}}>3</div>
                </div>
                <div className="p-2 bg-primary relative" style={{borderRadius: '10rem'}}>
                    <NotIcon />
                    <div className="flex justify-center items-center bg-[white] text-[red] text-[10px] w-4 h-4" style={{position: "absolute", top: '-.6rem', right: '-.3rem', borderRadius: '2rem'}}>5</div>
                </div>
                <div className="p-2 hidden bg-primary sm:block" style={{borderRadius: '10rem'}}>
                    <UserIcon />
                </div>
            </div>
        </div>
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
    </div>
}

export default Home
import React, { useState } from "react"
import MessageIcon from "../../assets/messageIcon"
import BarIcon from "../../assets/NavBar"
import NotIcon from "../../assets/notifications"
import SearchIcon from "../../assets/Search"
import SideBarIcon from "../../assets/sideBarIcon"
import UserIcon from "../../assets/userIcon"
import SideNav from "./sideNav"
import { Link } from "react-router-dom"
import whiteImg from "../../assets/logoWhite.png"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<boolean>(false)

    return <div>
        <div className="flex sticky z-[100] top-0 justify-between items-center p-4 gradient sm:p-6">
            <SideNav profile={profile} setIsVisible={setProfile} />
            <div className="flex items-center gap-6 sm:gap-[6rem]">
                <div style={{ cursor: 'pointer' }} onClick={() => setProfile(true)}><SideBarIcon /></div>
                <div className="relative">
                    <input type="text" className="w-[13rem] text-secondary p-2 pl-8 sm:w-[18rem]" placeholder="Search Sportlaze" style={{ borderRadius: '1.2rem', outline: 'none' }} />
                    <div style={{ position: 'absolute', top: '10px', left: '8px' }}><SearchIcon /></div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="relative mr-2" style={{ borderRadius: '10rem' }}>
                    {/* <Link to='/'><BarIcon /></Link> */}
                    <Link to="/"><img src={whiteImg} alt="logo" className="w-[2.5rem]" /></Link>
                </div>
                <div className="p-[10px] bg-primary relative" style={{ borderRadius: '10rem' }}>
                    <MessageIcon />
                    <div className="flex justify-center items-center bg-[white] text-[red] text-[10px] w-4 h-4" style={{ position: "absolute", top: '-.6rem', right: '-.3rem', borderRadius: '2rem' }}>3</div>
                </div>
                <div className="p-2 bg-primary relative" style={{ borderRadius: '10rem' }}>
                    <NotIcon />
                    <div className="flex justify-center items-center bg-[white] text-[red] text-[10px] w-4 h-4" style={{ position: "absolute", top: '-.6rem', right: '-.3rem', borderRadius: '2rem' }}>5</div>
                </div>
                <div className="p-2 hidden bg-primary sm:block" style={{ borderRadius: '10rem' }}>
                    <UserIcon />
                </div>
            </div>
        </div>
        <div>{children}</div>
    </div>
}

export default Layout
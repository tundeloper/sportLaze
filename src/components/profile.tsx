import { Button } from "@mui/material"
import React, { Dispatch, SetStateAction } from "react"
import logo from '../assets/1.png'
import UserIcon from "../assets/userIcon"
// import LoungeIcon from "../assets/lounge"
import ArrowRightCircle from "../assets/arrowRightCircle"
import Bookmark from "../assets/bookmark"
import { Link } from "react-router-dom"
import LoungeIcon from "../assets/lounge"

const Profile : React.FC<{profile: boolean, setIsVisible: Dispatch<SetStateAction<boolean>>}> = ({profile, setIsVisible}) => {
    return <div className={`sliding-component gradient-bb relative pt-10 p-2 bg-[red] w-[20rem] ${profile ? 'no-profile' : 'profile'}`} style={{position: 'fixed', left: '0', top: '0', zIndex: '3', borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem'}}>
        <Button onClick={() => setIsVisible(false)} style={{position: 'absolute', top: '.5rem', right: '0', color: 'red'}}>X</Button>
        <div className="border-b border-grey pb-10 mb-4">
        <div className="flex justify-center flex-col items-center mb-8">
            <img src={logo} alt="current user" className="h-14 w-14 rounded-[100%]" />
            <p className="font-bold text-xl">Johnson doe</p>
            <p>@Johnsondoe1</p>
        </div>
        <div className="flex justify-around">
            <div className="flex flex-col items-center"><p className="text">Following</p> <p className="font-bold">10</p></div>
            <div className="flex flex-col items-center"><p>Followers</p> <p className="font-bold">2000</p></div>
        </div>
        </div>
        <div className="flex flex-col justify-center gap-4 pl-10 mb-10 mt-8">
            <Link to={"/user"} className="flex items center gap-4"> <UserIcon /> <p>Profile</p></Link>
            <Link to={"/lounge"} className="flex items center gap-4"> <LoungeIcon h={25} w={27} /> <p>Lounge</p></Link>
            <Link to={"/bookmark"} className="flex items center gap-4"> <Bookmark /> <p>Bookmarks</p></Link>
        </div>
        <div className="flex justify-center mb-14">
            <Button sx={{color: 'white', fontWeight: 'bold', textTransform: 'capitalize', display: 'flex', gap: '.5rem'}}><p>settings and support</p> <ArrowRightCircle /></Button>  
        </div>
    </div>
}

export default Profile
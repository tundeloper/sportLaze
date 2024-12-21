import { NavLink } from "react-router-dom"
import HomeIcon from "../assets/home"
import LoungeIcon from "../assets/lounge"
import Share from "../assets/share"
// import VideoIcon from "../assets/svgs/video icon"
import user from '../assets/evans avatar.png'
import AddIcon from "../assets/addBtn"
import ExpandGray from "../assets/expandButtonsGrey"
import post from '../assets/posted picture.png'
import LikeIcon from "../assets/like"
import SendIcon from "../assets/send"
import CommentIcon from "../assets/comment"
// import Bookmarkicon from "../assets/bookmarkIcon"
import vid from '../assets/video icon.png'
// import ArrowUp from "../assets/arrowUp"
// import logo fom '../'
// import Bookmark from "../assets/bookmark"
// import ArrowUp from "../assets/arrowUp"

const Landing = () => {
    // const navs = [
    //     {name: 'home', path: '/', icon: <HomeIcon /> },
    //     {name: 'video', path: 'video', icon: <VideoIcon />},
    //     {name: 'lounge', path: '/lounge', icon: <LoungeIcon h={22} w={34} fill="#463a85" />},
    //     {name: 'share', path: '/share', icon: <Share />},
    // ]
    return <div className="relative">
        <nav className="flex sticky top-0 z-[6] justify-between mb-2">
        <NavLink to={'/'} className={({isActive}) => `px-8 py-4 ${isActive ? 'border-b-2 border-secondary' : ''}`}><HomeIcon /></NavLink>
        <NavLink to={'/videos'} className={({isActive}) => `px-8 py-4 ${isActive ? 'border-b-3 border-secondary' : ''}`}><img src={vid} alt="video icon"/></NavLink>
        <NavLink to={'/lounge'} className={({isActive}) => `px-8 py-4 ${isActive ? 'border-b border-secondary' : ''}`}><LoungeIcon h={22} w={34} fill="#463a85"/></NavLink>
        <NavLink to={'/share'} className={({isActive}) => `px-8 py-4 ${isActive ? 'border-b border-secondary' : ''}`}><Share /></NavLink>
            {/* {navs.map(link => {
                return <NavLink key={link.name} to={link.path} className={({isActive}) => `p-4 ${isActive ? 'text-[red] border-b border-secondary' : 'text-[blue]'}`}>{link.icon}</NavLink>
            })} */}
        </nav>
        <div>
        {/* new posts */}
        <div className="flex justify-center items-center h-[2rem]">
            {/* <div className="flex bg-secondary py-2 px-4 items-center gap-1 rounded-[1rem]"><p className="gap-2 text-white text-[10px]">New Post</p><p><ArrowUp /></p></div> */}
        </div>
        {/* posts */}

        <div className="flex w-full gap-4">
            <div className="w-[5-rem]">
                <img src={user} alt="user" className="h-[5rem] w-[5rem]"/>
            </div>
            <div className="w-[90%] mb-4">
                <div className="flex gap-4 items-center mb-2 ">
                    <div className="flex gap-2 justify-between w-full">
                        <div className="flex flex-col"><p className="font-bold">Evans Patrick</p> <p>@evansPatrick</p></div>
                        <div className="flex gap-2 items-center"><p className="text-secondary font-bold">FOLLOW</p> <AddIcon /></div>
                    </div>
                    <div>
                        {/* post */}
                    </div>
                    <div><ExpandGray /></div>
                </div>
                <p className="mb-2">🏆 Elevate your game with SportLaze!!!!! Connect, compete, and support your favourite team with a community that's as passionate as you are! 💪⚽️ <span className="font-bold">#SportLaze #GameOn</span></p>
                <div className="w-full gradient rounded-[1.5rem] mb-2" style={{overflow: 'hidden', height: 'auto'}}>
                    {/* img */}
                    <img src={post} alt="post" className="w-full"/>
                </div>
                <div className="flex justify-between items-center w-full">
                    <div className="flex gap-4">
                        <div className="flex gap-[4px] items-center"><LikeIcon /> <p>15.3k</p></div>
                        <div className="flex gap-[4px] items-center"><CommentIcon /> <p>15.3k</p></div>
                        <div className="flex gap-[1px] items-center"><SendIcon /> <p>15.3k</p></div>
                    </div>
                    {/* Bookmark */}
                    {/* <div><Bookmarkicon /></div> */}
                </div>
            </div>
        </div>

        <div className="flex w-full gap-4">
            <div className="w-[5-rem]">
                <img src={user} alt="user" className="h-[5rem] w-[5rem]"/>
            </div>
            <div className="w-[90%] mb-4">
                <div className="flex gap-4 items-center mb-2 ">
                    <div className="flex gap-2 justify-between w-full">
                        <div className="flex flex-col"><p className="font-bold">Evans Patrick</p> <p>@evansPatrick</p></div>
                        <div className="flex gap-2 items-center"><p className="text-secondary font-bold">FOLLOW</p> <AddIcon /></div>
                    </div>
                    <div>
                        {/* post */}
                    </div>
                    <div><ExpandGray /></div>
                </div>
                <p className="mb-2">🏆 Elevate your game with SportLaze!!!!! Connect, compete, and support your favourite team with a community that's as passionate as you are! 💪⚽️ <span className="font-bold">#SportLaze #GameOn</span></p>
                <div className="w-full gradient rounded-[1.5rem] mb-2" style={{overflow: 'hidden', height: 'auto'}}>
                    {/* img */}
                    <img src={post} alt="post" className="w-full"/>
                </div>
                <div className="flex justify-between items-center w-full">
                    <div className="flex gap-4">
                        <div className="flex gap-[4px] items-center"><LikeIcon /> <p>15.3k</p></div>
                        <div className="flex gap-[4px] items-center"><CommentIcon /> <p>15.3k</p></div>
                        <div className="flex gap-[1px] items-center"><SendIcon /> <p>15.3k</p></div>
                    </div>
                    {/* Bookmark */}
                    {/* <div><Bookmarkicon /></div> */}
                </div>
            </div>
        </div>

        
        </div>
    </div>
}

export default Landing
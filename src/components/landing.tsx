import { NavLink } from "react-router-dom"
import HomeIcon from "../assets/home"
import LoungeIcon from "../assets/lounge"
import Share from "../assets/share"
import VideoIcon from "../assets/svgs/video icon"
import user from '../assets/evans avatar.png'
import AddIcon from "../assets/addBtn"
import ExpandGray from "../assets/expandButtonsGrey"
import post from '../assets/posted picture.png'
import LikeIcon from "../assets/like"
import SendIcon from "../assets/send"
import CommentIcon from "../assets/comment"
// import Bookmarkicon from "../assets/bookmarkIcon"
// import logo fom '../'
// import Bookmark from "../assets/bookmark"
// import ArrowUp from "../assets/arrowUp"

const Landing = () => {
    const navs = [
        {name: 'home', path: '/', icon: <HomeIcon /> },
        {name: 'video', path: 'video', icon: <VideoIcon />},
        {name: 'lounge', path: '/lounge', icon: <LoungeIcon h={22} w={34} fill="#463a85" />},
        {name: 'share', path: '/share', icon: <Share />},
    ]
    return <div>
        <nav className="flex justify-between px-4 mb-2">
            {navs.map(link => {
                return <NavLink key={link.name} to={link.path} className={({isActive}) => `p-4 ${isActive ? 'text-[red] border-b border-secondary' : 'text-[blue]'}`}>{link.icon}</NavLink>
            })}
        </nav>
        <div>
        {/* new posts */}
        {/* <div className="flex justify-center items-center"><div className="flex bg-secondary p-2 items-center gap-3 rounded-[1rem]"><p className="gap-2 text-white text-[10px]">New Post</p><p><ArrowUp /></p></div></div> */}
        {/* posts */}

        <div className="flex w-full gap-4">
            <div className="w-[10rem]">
                <img src={user} alt="user" className="h-[10rem] w-[10rem]"/>
            </div>
            <div className="w-[80%] mb-4">
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
                <div className="h-[20rem] w-full gradient rounded-[1.5rem] mb-2" style={{overflow: 'hidden'}}>
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
            <div className="w-[10rem]">
                <img src={user} alt="user" className="h-[10rem] w-[10rem]"/>
            </div>
            <div className="w-[80%]">
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
                <p>🏆 Elevate your game with SportLaze!!!!! Connect, compete, and support your favourite team with a community that's as passionate as you are! 💪⚽️</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae enim libero voluptatibus. Omnis voluptates totam eos quos nesciunt dignissimos optio recusandae repellendus atque ab aliquam ipsam, obcaecati eveniet voluptatem vel.</p>
                <div className="h-[20rem] w-full gradient rounded-[1rem]">
                    imgage
                </div>
            </div>
        </div>
        </div>
    </div>
}

export default Landing
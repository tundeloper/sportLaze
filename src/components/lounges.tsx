import { Link } from "react-router-dom"
import LoungeIcon from "../assets/lounge"
import user from '../assets/evans avatar.png'

const Lounge = () => {
    return <div className="bg-white text-white mb-4 p"  style={{height: 'min-content', borderRadius: '1rem', overflow: 'hidden'}}>
        <div className="flex justify-between items-center font-bold p-4 gradient-r mb-2">
            <div><p>My</p><p>Lounges</p></div>
            <LoungeIcon h={29} w={58} />
        </div>
        <div className="text-black font-bold pb-4">
            <div className="flex justify-between items-center border-grey border-t border-b p-2">
            <div>
                <p>Soccer</p>
                <p className="text-[10px]">45k Active</p>
            </div>
                <div className="flex people firs">
                    <img src={user} alt='soccer' className="h-8 w-8 rounded-[2rem] border border-white" />
                    <img src={user} alt='soccer' className="h-8 w-8 rounded-[2rem] border border-white" />
                    <img src={user} alt='soccer' className="h-8 w-8 rounded-[2rem] border border-white" />
                </div>
            </div>

            <div className="flex justify-between items-center border-grey border-t border-b p-2">
            <div>
                <p>Basket Ball</p>
                <p className="text-[10px]">30k Active</p>
            </div>
                <div className="flex people firs">
                    <img src={user} alt='soccer' className="h-8 w-8 rounded-[2rem] border border-white" />
                    <img src={user} alt='soccer' className="h-8 w-8 rounded-[2rem] border border-white" />
                    <img src={user} alt='soccer' className="h-8 w-8 rounded-[2rem] border border-white" />
                </div>
            </div>

            <div className="flex justify-between items-center border-grey border-t border-b p-2">
            <div>
                <p>The NFL</p>
                <p className="text-[10px]">100k Active</p>
            </div>
                <div className="flex people firs">
                    <img src={user} alt='soccer' className="h-8 w-8 rounded-[2rem] border border-white" />
                    <img src={user} alt='soccer' className="h-8 w-8 rounded-[2rem] border border-white" />
                    <img src={user} alt='soccer' className="h-8 w-8 rounded-[2rem] border border-white" />
                </div>
            </div>

            <div className="flex justify-between items-center border-grey border-t border-b p-2">
            <div>
                <p>Hockey</p>
                <p className="text-[10px]">35 Active</p>
            </div>
                <div className="flex people firs">
                    <img src={user} alt='soccer' className="h-8 w-8 rounded-[2rem] border border-white" />
                    <img src={user} alt='soccer' className="h-8 w-8 rounded-[2rem] border border-white" />
                    <img src={user} alt='soccer' className="h-8 w-8 rounded-[2rem] border border-white" />
                </div>
            </div>
        </div>
        <Link to='#' className="flex justify-center text-center text-secondary mb-4">Show more</Link>
    </div>
}

export default Lounge
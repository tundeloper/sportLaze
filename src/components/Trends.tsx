import { Link } from "react-router-dom"
import TrendingIcon from "../assets/trendingicon"
import ExpandButton from "../assets/expandButton"

const Trends = () => {
    return <div className="bg-white p-4 mb-4"  style={{height: 'min-content', borderRadius: '1rem'}}>
        <div className="flex gap-2 items-center mb-4">
            <TrendingIcon />    
            <p className="font-bold text-xl">Trends for you</p>
        </div>
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <div className="font-bold">
                <p className="text-[10px]">NFL</p>
                <p>Super Bowl Lix</p>
                <p className="text-[10px]">Trending in UK <span className="text-[8px]">+350k posts</span></p>
                </div>
                <div style={{padding: '0'}}><ExpandButton /></div>
            </div>
            <div className="flex justify-between items-center">
                <div className="font-bold">
                <p className="text-[10px]">Soccer</p>
                <p>Manchester united</p>
                <p className="text-[10px]">Trending in US <span className="text-[8px]">+50k posts</span></p>
                </div>
                <div style={{padding: '0'}}><ExpandButton /></div>
            </div>
            <div className="flex justify-between items-center">
                <div className="font-bold">
                <p className="text-[10px]">Hockey</p>
                <p>Connor McDavid</p>
                <p className="text-[10px]">Trending in Canada <span className="text-[8px]">+30k posts</span></p>
                </div>
                <div style={{padding: '0'}}><ExpandButton /></div>
            </div>
            <Link to={'#'} className="text-center text-secondary">show more</Link>
        </div>
    </div>
}

export default Trends
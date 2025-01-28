import React from 'react'
// import soccer from '../assets/lounge/soccer.png'
import MultipleUserIcon from '../assets/svgs/multipleUserIcon'
import PointCircle from '../assets/svgs/signIncircle'
import { Link } from 'react-router-dom'

const LoungeCard: React.FC<{ stats: number | string, title: string, image: string }> = ({ stats, title, image }) => {
    return <Link to={`/lounge/${title}`}>
        <div
            className="min-w-[150px] h-[200px] bg-[#463a85a1] relative overflow-hidden rounded-xl bg-cover bg-center relative flex items-end shadow-lg bg-gradient-to-t from-secondary/90 to-primary text-white hover:scale-105 transition-transform sm:w-[200px] sm:h-[250px]"
            style={{
                backgroundRepeat: 'no-repeat',
                backgroundImage: `
                linear-gradient(to top, #463a85, #9a1b395e),
                url('${image}')`,
                // backgroundSize: '_ 350px'
            }}>
            {/* linear-gradient(to top,rgb(58, 57, 62), #9a1b395e), */}

            {/* Gradient Overlay */}
            {/* bg-gradient-to-t from-secondary/80 to-secondary50 */}
            <div className="w-full p-4 text-white pt-[8rem] bg-gradient-to-t from-secondary to-secondary50">
                <h3 data-testid="title" className="text-lg font-semibold absolute p-3 text-center" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", borderTop: '1px solid white', width: '100%', borderBottom: '1px solid white' }}>{title}</h3>
                <div className="flex justify-between items-center mt-2 text-sm">
                    <span className="flex gap-2 items-center"><MultipleUserIcon /> {stats}</span>
                    <span><PointCircle /></span>
                </div>
            </div>
        </div>
    </Link>
}

export default LoungeCard
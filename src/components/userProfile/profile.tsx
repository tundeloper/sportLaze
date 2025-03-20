import Trends from "../../components/Trends"
import Lounge from "../../components/lounges"
import Fixture from "../../components/Fixture"
// import img from '../assets/logo gradient.svg'
// import whitelogo from '../assets/whitelogo1.png'
import Landing from "../../components/landing"
import PostSlider from "../../components/postSlide"
import Layout from "../../components/layout/layout"
import Predictions from "../../components/predictions"
import LiveScore from "../../components/livesscore"
import { useSportlaze } from "../../hooks/useContext"
import { ReactNode } from "react"

const UserProfile : React.FC<{children: ReactNode}> = ({children}) => {

    const { darkMode } = useSportlaze()

    return <div className="w-screen relative bg-[#dbd2d2] h-screen dark:bg-[#4a4646]" style={{ overflowX: 'hidden' }}>
        <Layout>
            <div className="flex w-full flex-row-reverse text-black lg:flex-row" style={{ overflow: 'hidden' }}>
                <div className="w-[35%] hidden m-2 lg:block">
                    <Trends />
                    <Lounge />
                </div>
                <div className="bg-white w-full sm: dark:bg-[black]">
                    {children}
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
}

export default UserProfile
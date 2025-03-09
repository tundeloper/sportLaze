import { Button } from "@mui/material"
import PremierLeagueLogo from "../assets/premierLeagueLogo"
import FixtureMatch from "./fixtureMatch"

const Fixture = () => {
    return <div className="bg-gradient-to-b from-[#f1f1f1] via-[#f1f1f1] to-[rgba(71,58,133,0.45)] text-white mb-4 h-[50rem] dark:from-[black] dark:via-[black] dark:to-[black]" style={{ height: 'min-content', borderRadius: '1rem', overflow: 'hidden' }}>
        <div className="flex justify-center items-center font-bold p-4 pb-12 gradient-r mb-2">
            <p className="text-center">WEEKLY FIXTURE</p>
        </div>
        <div className="flex justify-center"><div className="flex justify-center items-center bg-white p-2 w-20 h-20" style={{ borderRadius: '100%', transform: 'translateY(-3rem)' }}><PremierLeagueLogo fill="#3E0F51"/></div></div>
        <div className="flex flex-col items-center p-2 font-bold" style={{ transform: 'translateY(-2rem)' }}>
            <div className="text-center text-[15px] text-secondary border border-primary rounded-[1rem] px-4 mb-2 dark:border-white dark:text-white">FRIDAY 18 OCTOBER</div>
            <FixtureMatch />
            <div className="text-center text-[15px] text-secondary border border-primary rounded-[1rem] px-4 mb-2 dark:border-white dark:text-white">SATURDAY 19 OCTOBER</div>
            <FixtureMatch />
            <FixtureMatch />
            <FixtureMatch />
            <FixtureMatch />
            <div className="text-center text-[15px] text-secondary border border-primary rounded-[1rem] px-4 mb-2 dark:border-white dark:text-white">SUNDAY 20 OCTOBER</div>
            <FixtureMatch />
            <Button sx={{ color: 'white', background: '#9a1b39', marginTop: '8px', borderRadius: '2rem', transform: 'translateY(1rem)', textTransform: 'capitalize', padding: '5px 1rem', }}>View All</Button>
        </div>
    </div>
}

export default Fixture
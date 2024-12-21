import Layout from "../components/layout/layout"
import logo from '../assets/logoWhite.png'
import LoungeIcon from "../assets/lounge"
import TopLounges from "../components/topLounges"
import { Box, IconButton, Typography } from "@mui/material"
import LoungeCard from "../components/loungeCard"
import FilterIcon from "../assets/svgs/filter"
import SearchIcon from "../assets/Search"
// import SearchIcon from "../assets/Search"

const Lounge = () => {
    const lounges = [
        { name: "Golf", stats: "990k", image: "/path/to/golf.jpg" },
        { name: "MMA", stats: "990k", image: "/path/to/mma.jpg" },
        { name: "Cycling", stats: "990k", image: "/path/to/cycling.jpg" },
        { name: "Formula Race", stats: "990k", image: "/path/to/formula.jpg" },
        { name: "Golf", stats: "990k", image: "/path/to/golf.jpg" },
        { name: "MMA", stats: "990k", image: "/path/to/mma.jpg" },
        { name: "Cycling", stats: "990k", image: "/path/to/cycling.jpg" },
        { name: "Formula Race", stats: "990k", image: "/path/to/formula.jpg" },
        { name: "Golf", stats: "990k", image: "/path/to/golf.jpg" },
        { name: "MMA", stats: "990k", image: "/path/to/mma.jpg" },
        { name: "Cycling", stats: "990k", image: "/path/to/cycling.jpg" },
        { name: "Formula Race", stats: "990k", image: "/path/to/formula.jpg" },
        { name: "Golf", stats: "990k", image: "/path/to/golf.jpg" },
        { name: "MMA", stats: "990k", image: "/path/to/mma.jpg" },
        { name: "Cycling", stats: "990k", image: "/path/to/cycling.jpg" },
        { name: "Formula Race", stats: "990k", image: "/path/to/formula.jpg" },
      ];
    
    return <div>
        <Layout>
            <div className="w-full h-[auto] bg-contain gradient-mask">
                <div className="flex gap-4 pt-4 justify-center items-center flex-col">
                    <img src={logo} alt="white sportlaze logo" className="w-[auto] h-[5rem] mb-2"/>
                    <div className="flex gap-4 rounded-xl items-center justify-between px-10 py-4" style={{border: '2px solid white'}}>
                        <LoungeIcon h={30} w={60} />
                        <h1 className="font-bold text-[2rem]">Lounge</h1>
                    </div>
                    <div>
                        <TopLounges />
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-full min-h-[100vh] items-center  bg-white pb-10">
            <Box className="p-4  border-2 mx-4 border-primary rounded-lg text-black lg:mx-[10%]">
                <Box className="flex justify-between items-center mb-3 px-5">
                    <Typography variant="h5" style={{fontWeight: 'bold', color: '#463a85'}}>
                        Lounges
                    </Typography>
                    {/* Search and Filters */}
                    <Box className="flex items-center">
                    <div className="relative">
                        <input type="text" className="w-[13rem] text-secondary p-2 pl-8 sm:w-[18rem]" placeholder="Search Lounges" style={{borderRadius: '1.3rem', outline: 'none', background: '#dcdcdc'}} />
                        <div style={{position: 'absolute', top: '10px', left: '8px'}}><SearchIcon /></div>
                    </div>
                    <IconButton>
                        <FilterIcon />
                    </IconButton>
                    </Box>
                </Box>

                {/* Grid Layout */}
                <Box className="grid grid-cols-4 gap-4 rounded-lg py-2 px-5 overflow-y-scroll overflow-x-hidden custom-scrollbar" style={{ maxHeight: "500px" }}>
                    {lounges.map((lounge, index) => (
                    <LoungeCard key={index} image={lounge.image} stats={lounge.stats} title={lounge.name} />
                    ))}
                </Box>
            </Box>
            </div>
        </Layout>
    </div>
}

export default Lounge
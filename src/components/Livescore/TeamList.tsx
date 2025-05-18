import SearchIcon from "../../assets/Search";
import { leagueType } from "./Livescore";
import { ChevronRight } from "lucide-react";

const TeameList: React.FC<{type: string, showSearch?: boolean, data: leagueType[]}> = ({type, data, showSearch = false}) => {
    // const [allLeagues, setAllLeagues] = useState<boolean>(false)
    // const targetCountries = ['England', 'Spain', 'Germany', 'France', 'Italy'];
    // let target
    // if(!allLeagues) {
    //     target = data.filter(country =>
    //     targetCountries.includes(country.name)
    //     )
    // } else {
    //     target = data
    // }

    
    return (<div className={`border border-[#BCBEC0] max-w-[275px] rounded-lg ${!showSearch && 'border-t-0'}`}>
            {showSearch && <div className='flex gap-2 items-center p-2'>
                <SearchIcon />
                <input type="text" placeholder='Search' className='w-full text-gray-500 bg-transparent border-none outline-none' />
            </div>}
            <div className='flex items-center justify-between gap-2 p-3 bg-[#D9D9D9]'>
                <h5 className='text-[14px] uppercase text-black font-bold'>{type}</h5>
                <ChevronRight color='black' className='cursor-pointer' />
            </div>
            <div className='flex flex-col'>
                {
                    data.map((data, index) => (
                        <div key={index} className='flex items-center gap-2 p-3 border-b border-[#BCBEC0] cursor-pointer hover:bg-slate-300'>
                            <img src={data.logo} alt="england" className='w-[27px] h-[16px]' />
                            <p className='text-sm text-gray-500'>{data.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>)
}
export default TeameList;
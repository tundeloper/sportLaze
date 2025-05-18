import React, { useState } from 'react'
import SearchIcon from '../../assets/Search'
// import englandImg from '../../assets/england.jpg'
import { ChevronRight } from 'lucide-react'
import { countrytype } from './Livescore'
const CountryList: React.FC<{type: string, showSearch?: boolean, data: countrytype[]}> = ({type, data, showSearch = false}) => {
    const [allCountries, setAllCountries] = useState<boolean>(false)
    const targetCountries = ['England', 'Spain', 'Germany', 'France', 'Italy'];
    let target
    if(!allCountries) {
        target = data.filter(country =>
        targetCountries.includes(country.name)
        )
    } else {
        target = data
    }

  return (
    <div className={`border border-[#BCBEC0] max-w-[275px] rounded-lg ${!showSearch && 'border-t-0'}`}>
        {showSearch && <div className='flex gap-2 items-center p-2'>
            <SearchIcon />
            <input type="text" placeholder='Search' className='w-full text-gray-500 bg-transparent border-none outline-none' />
        </div>}
        <div className='flex items-center justify-between gap-2 p-3 bg-[#D9D9D9]' onClick={() => setAllCountries(prev => !prev)}>
            <h5 className='text-[14px] uppercase text-black font-bold'>{type}</h5>
            <ChevronRight color='black' className='cursor-pointer' />
        </div>
        <div className='flex flex-col'>
            {
                target.map((data, index) => (
                    <div key={index} className='flex items-center gap-2 p-3 border-b border-[#BCBEC0] cursor-pointer hover:bg-slate-300'>
                        <img src={data.flag} alt="england" className='w-[27px] h-[16px]' />
                        <p className='text-sm text-gray-500'>{data.name}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default CountryList
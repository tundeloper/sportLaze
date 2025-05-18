import React from 'react'
import englandImg from '../../assets/england.jpg'
import { ChevronRight } from 'lucide-react'
import ManuImg from '../../assets/manu.png'
const Score: React.FC = () => {
    return (
        <div className='mt-4 bg-white rounded-lg p-4'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <img src={englandImg} alt="england" className='w-[27px] h-[16px]' />
                    <div>
                        <div className='flex items-center gap-2'>
                            <h6 className='text-[16px] text-black font-bold'>Premier League</h6>
                            <div className='text-[12px] text-gray-500 flex items-center gap-2 border border-red-500 rounded-full px-2'>
                                <div className='w-[8px] h-[8px] rounded-full bg-red-500'></div>
                                <span>Live</span>
                            </div>
                        </div>
                        <p className='text-[14px] text-gray-500'>England</p>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <p className='text-[14px] text-black font-bold'>View All</p>
                    <ChevronRight color='black' />
                </div>
            </div>
            <div className='flex gap-4 mt-4'>
                <ScoreCard />
                <ScoreCard />
            </div>
        </div>
    )
}

export default Score

const ScoreCard: React.FC = () => {
    return (
        <div className='w-[50%] border border-[#BCBEC0] rounded-lg p-4'>
            <div className='flex items-start justify-between'>
                <div>
                    <h5 className='text-[18px] text-black font-bold'>Week 14</h5>
                    <p className='text-[14px] text-[#33363F]'>Dec 20th, 2024 10:00 PM</p>
                </div>
                <div className='text-[12px] text-white flex items-center gap-2 bg-[#9A1B39] rounded-full px-2 py-1'>
                    <div className='w-[8px] h-[8px] rounded-full bg-white'></div>
                    <span>90'+4</span>
                </div>
            </div>
            <div className='flex items-center justify-between gap-4 mt-8'>
                <img src={ManuImg} alt="manu" className='w-[80px] h-[80px]' />
                <div className='flex flex-col items-center'>
                    <div className='flex items-center gap-2'>
                        <p className='text-[30px] text-black font-bold'>2</p>
                        <p className='text-[14px] text-black font-bold'>:</p>
                        <p className='text-[30px] text-black font-bold'>1</p>
                    </div>
                    <p className='text-[10px] text-[#707271]'>Emirates Stadium</p>
                </div>
                <img src={ManuImg} alt="manu" className='w-[80px] h-[80px]' />
            </div>
            <button className='w-full h-[40px] border border-[#BCBEC0] rounded-full text-[14px] text-[#33363F] font-bold mt-10'>View Match Stats</button>
        </div>
    )
}
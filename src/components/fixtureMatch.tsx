import manu from '../assets/vecteezy_manchester-united-fc-emblem-on-iconic-red-backdrop_.png'
// import chealsea from '../assets/'

const FixtureMatch = () => {
    return <div className="flex text-[11px] items-center gap-2 text-secondary mb-2 dark:text-white">
        <div className='flex gap-2'><p>Man United</p> <img src={manu} alt='manu' /></div>
        <div className="bg-secondary rounded-[1rem] p-[3px] text-white">16:25</div>
        <div className='flex gap-2'><img src={manu} alt='manu' /> <p>Liverpool</p></div>
    </div>
}

export default FixtureMatch
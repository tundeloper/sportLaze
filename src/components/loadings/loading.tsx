const Loading = () => {
    const lounge = ['', '', '', '']
    return <div>
    <div className="flex sticky z-[100] top-0 justify-between items-center p-4 bg-grey sm:p-6">
        <div className="flex items-center gap-6 sm:gap-12">
        <div className="w-[2rem] h-[2rem] bg-secondary rounded-md loading"> </div>
        <div className="w-[10rem] h-[2rem] bg-secondary rounded-md loading"> </div>
        </div>
        <div    className="flex items-center gap-2">
            <div className="p-2 hidden bg-primary relative sm:block h-[2rem] w-[2rem] loading" style={{borderRadius: '10rem'}}>
                {/* <BarIcon /> */}
            </div>
            <div className="p-2 bg-primary relative h-[2rem] w-[2rem] loading" style={{borderRadius: '10rem'}}>
                {/* <MessageIcon /> */}
            </div>
            <div className="p-2 bg-primary relative h-[2rem] w-[2rem] loading" style={{borderRadius: '10rem'}}>
                {/* <NotIcon /> */}
            </div>
            <div className="p-2 hidden bg-primary sm:block h-[2rem] w-[2rem] loading" style={{borderRadius: '10rem'}}>
                {/* <UserIcon /> */}
            </div>
        </div>
    </div>
    {/* //// */}
    <div className="flex w-full flex-row-reverse text-black lg:flex-row" style={{overflow: 'hidden'}}>
        {/* left Bar */}
        <div className="w-[35%] hidden rounded-md m-2 lg:block">
                {/* <Trends /> */}
                <div className="bg-grey p-4 mb-4"  style={{height: 'min-content', borderRadius: '1rem'}}>
        <div className="flex gap-2 items-center mb-4">
            {/* <TrendingIcon />     */}
            <div className="w-[6rem] h-[1rem] bg-primary rounded-md loading"></div>
        </div>
        <div className="flex flex-col gap-4">
            {lounge.map((_, i) => {
                return <div key={i} className="flex justify-between items-center">
                <div className="font-bold">
                <div className="w-[3rem] h-[.5rem] bg-primary rounded-md mb-1 loading"></div>
                <div className="w-[6rem] h-[1rem] bg-primary rounded-md mb-1 loading"></div>
                <div className="w-[5rem] h-[.4rem] bg-primary rounded-md mb-1 loading"></div>
                </div>
                <div className="w-4 h-4 bg-primary rounded-full loading"></div>
            </div>
            })}
            
            {/* <Link to={'#'} className="text-center text-secondary">show more</Link> */}
        </div>
    </div>
                {/* <Lounge /> */}
                <div className="bg-grey text-gray mb-4 p"  style={{height: 'min-content', borderRadius: '1rem', overflow: 'hidden'}}>
        <div className="flex justify-between items-center font-bold p-4 mb-2">
            <div><div className="w-[2rem] h-[1rem] bg-primary rounded-md mb-1 loading"></div><div className="w-[5rem] h-[1rem] bg-primary rounded-md mb-1 loading"></div></div>
            {/* <LoungeIcon h={29} w={58} /> */}
        </div>
        <div className="text-black font-bold pb-4">
            {lounge.map((_, i) => {
                return <div key={i} className="flex justify-between items-center border-grey border-t border-b p-2">
                <div>
                    <div className="w-[6rem] h-[1rem] bg-primary rounded-md mb-1 loading"></div>
                    <div className="w-[6rem] h-[.4rem] bg-primary rounded-md mb-1 loading"></div>
                </div>
                    <div className="flex people firs">
                        <div className="w-[6rem] h-[1rem] bg-primary rounded-md loading"></div>
                    </div>
                </div>
            })}
            
        </div>
        </div>
        </div>
        {/* main content ///// */}
        <div className="bg-grey w-full h-[auto] p-4 sm: w-full sm:rounded-[1rem]">
           {/* MAIN CONTENT */}
           <nav className="flex gap-4 sticky top-0 z-[6] justify-between mb-2">
           <div className="w-full h-[2rem] bg-secondary rounded-md loading" />
           <div className="w-full h-[2rem] bg-secondary rounded-md loading" />
           <div className="w-full h-[2rem] bg-secondary rounded-md loading" />
           <div className="w-full h-[2rem] bg-secondary rounded-md loading" />
            {/* {navs.map(link => {
                return <NavLink key={link.name} to={link.path} className={({isActive}) => `p-4 ${isActive ? 'text-[red] border-b border-secondary' : 'text-[blue]'}`}>{link.icon}</NavLink>
            })} */}
        </nav>
        <div className="w-full bg-grey h-[1rem] loading rounded-md mb-2" />
        <div className="w-full bg-grey h-[10rem] loading rounded-md mb-2" />
        <div className="w-full bg-grey h-[10rem] loading rounded-md mb-2" />
        <div className="w-full bg-grey h-[3rem] loading rounded-md" />
        <div className="w-full bg-grey h-[10rem] loading rounded-md mb-2" />
        <div className="w-full bg-grey h-[1rem] loading rounded-md mb-2" />
        </div>
            {/* right nav /// */}
            <div className="w-[40%] hidden m-2 sm:block">
                {/* <Fixture /> */}
                <div className="bg-grey p-4 mb-4"  style={{height: 'min-content', borderRadius: '1rem'}}>
        <div className="flex gap-2 items-center mb-4">
            {/* <TrendingIcon />     */}
            <div className="w-[6rem] h-[1rem] bg-primary rounded-md loading"></div>
        </div>
        <div className="flex flex-col gap-4">
            {lounge.map((_, i) => {
                return <div key={i} className="flex justify-between items-center">
                <div className="font-bold">
                <div className="w-[3rem] h-[.5rem] bg-primary rounded-md mb-1 loading"></div>
                <div className="w-[6rem] h-[1rem] bg-primary rounded-md mb-1 loading"></div>
                <div className="w-[5rem] h-[.4rem] bg-primary rounded-md mb-1 loading"></div>
                </div>
                <div className="w-4 h-4 bg-primary rounded-full loading"></div>
            </div>
            })}
            
            {/* <Link to={'#'} className="text-center text-secondary">show more</Link> */}
        </div>
    </div>
            </div>
    </div>
</div>
}

export default Loading
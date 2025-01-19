import { CircularProgress } from "@mui/material"

const Overlay = () => {
    return <div className="flex justify-center items-center bg-[rgba(0, 0, 0, 0)]" style={{position: 'absolute', top: '0', right: '0', height: '100vh', width: '100vw', zIndex: '1000'}}>
        <CircularProgress size="50px" />
    </div>
}

export default Overlay
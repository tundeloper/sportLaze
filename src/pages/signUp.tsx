import { Box, Button, TextField, Typography } from "@mui/material"
import React from "react"
import CountriesDropDown from "../components/contrydropdown"
import FavSport from "../components/FavSport"
import FavTeam from "../components/FavTeam"
import DOB from "../components/DOB"

const SignUp: React.FC<{visible: boolean}> = ({visible}) => {
    return <div className={`flex flex-col p-[2rem] justify-center items-center text-black relative rounded-[1rem] bg-[white] w-[28rem] scale ${visible ? 'reset-position' : 'scale-down'}`} style={{position: "absolute"}} >
        <Box component="form" className="w-full">
            {/* <input placeholder="Name" style={{outline: 'none'}} className="mb-2" /> */}
            <TextField fullWidth placeholder="Name" style={{marginBottom: '.5rem'}}/>
            <TextField fullWidth placeholder="Email" style={{marginBottom: '.5rem'}}/>
            <Typography gutterBottom >Date of Birth</Typography>
            <DOB />
            <p className="text-[12px] mb-2">Your Date of Birth will not appear on your profile. Please confirm your real age</p>
            <div className="mb-4">
                <CountriesDropDown />
            </div>
            <div className="mb-4">
                <FavSport />
            </div>
            <div className="mb-4">
                <FavTeam />
            </div>
            {/* <TextField fullWidth placeholder="Favourite Sport" style={{marginBottom: '.5rem'}}/>
            <TextField fullWidth placeholder="Favourite Sport Team"/> */}
            <div className="flex justify-center w-full">
            <Button sx={{color: 'white', background: '#463a85', borderRadius: '2rem', textTransform: 'capitalize', padding: '10px 2.5rem',}}>Create Account</Button>
            </div>
        </Box>
    </div>
}

export default SignUp
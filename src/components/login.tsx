import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import bg from '../assets/background.jpg'
import logo from '../assets/whitelogo1.png'
import GoogleIcon from "../assets/svgs/googlesvg"
import AppleIcon from "../assets/svgs/apple"
import FacebookIcon from "../assets/svgs/facebook"

const Login : React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const handleClickShowPassword = () => setShowPassword((prev) => !prev)
    return <div className="flex justify-center items-center relative h-screen bg-cover" style={{backgroundImage: `url(${bg})`}}>
        <img src={logo} alt="sportlaze logo" style={{position: 'absolute', top: '10px', left: '1rem', height: '3rem'}}/>
        <div className="p-[5px] bg-[linear-gradient(to_bottom_left,_#463a85,_#9a1b39)] rounded-[1.2rem]">
        <div className="flex flex-col px-[3.5rem] bg-[linear-gradient(to_top_,_#463a85,_#9a1b39)] rounded-[1rem]" style={{backgroundImage: `linear-gradient(rgba(128, 128, 128, 0.4), rgba(128, 128, 128, 0.4)), url(${bg})`,}}>
        <h1 className="text-4xl px-8 mt-[1rem]">Welcome!</h1>
            <h1 className="text-xl text-left mt-6 mb-4 font-bold">Login</h1>
            <Box component={'form'}>
                <Box sx={{marginBottom: '1.8rem'}}>
                <Typography component='label' htmlFor="email" gutterBottom sx={{float: 'left'}}>Email</Typography>
                <input type="email" id="email" placeholder="username@gmail.com"  className="w-full p-2 pr-[1rem] border text-black border-gray-300 rounded transition duration-200 focus:border-green-500 hover:border-yellow-200 focus:bg-white outline-none "/>
                {/* <TextField 
                fullWidth
                name="email"
                id="email"
                placeholder="username@gmail.com"
                sx={{
                    // height: '2.5rem',
                    minHeight: '56px',
                    '& .MuiOutlinedInput-root': {
                    //  height: '2.5rem',
                      '& fieldset': {
                        borderColor: 'green'
                      },
                      '&:hover fieldset': {
                        borderColor: 'yellow', // Darker color on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '463a85',// change focused color
                      },
                      '& .MuiAutocomplete-input': {
                        width: '300px', // Set the width of the input
                        transition: 'width 0.3s ease', // Smooth transition for width change
                      },
                      '&:hover .MuiAutocomplete-input': {
                        width: '2.25rem', // Change width on hover
                      },
                    },
                  }} 
                  InputProps={{
                    'aria-label': 'first name',
                    sx: { height: '2.5rem', background: 'white'}
                }}/> */}
                </Box>

                <Box>
                <Typography component='label' htmlFor="password" gutterBottom style={{float: 'left'}}>Password</Typography>
                <TextField 
                fullWidth
                id="password"
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                sx={{
                    height: '1rem',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'green'
                      },
                      '&:hover fieldset': {
                        borderColor: '463a85', // Darker color on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '463a85',// change focused color
                      },
                    },
                  }} 
                  InputProps={{
                    'aria-label': 'first name',
                    sx: { height: '2.5rem', background: 'white'},
                    endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                }}/>
                </Box>
                <Box sx={{marginTop: '1.5rem',marginBottom: '1rem', display: 'flex', flexDirection: 'row-reverse'}}>
                  <Link to="#" style={{float: 'right'}}>Forget Password?</Link>
                </Box>
                <Box>
                  <Button sx={{background: '#9a1b39', fontWeight:'bold', textTransform: 'capitalize'}} fullWidth variant="contained" disableElevation>Sign in</Button>
                </Box>
                <div className="my-[1rem]"><p className="mt-[1rme] text-sm">Or continue with</p></div>
                <div className="flex items-center justify-between gap-4 my-[1rem]">
                  <Link to="#" className="px-[2rem] py-2 rounded-[5px] bg-white text-black"><GoogleIcon /></Link>
                  <Link to="#" className="px-[2rem] py-2 rounded-[5px] bg-white text-black"><AppleIcon /></Link>
                  <Link to="#" className="px-[2rem] py-2 rounded-[5px] bg-white text-black"><FacebookIcon /></Link>
                </div>
                <p className="font-light mb-4 text-sm">Don't have an account yet? <Link to='/signup' className="font-bold"> Register for freee</Link></p>
            </Box>
        </div>
        </div>
        {/* <h1 className="text-2xl text-primary bg-[red]">logoin</h1> */}
    </div>
}

export default Login
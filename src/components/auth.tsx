// import { Visibility, VisibilityOff } from "@mui/icons-material"
// import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import bg from '../assets/background.jpg'
import logo from '../assets/whitelogo1.png'
import GoogleIcon from "../assets/svgs/googlesvg"
import AppleIcon from "../assets/svgs/apple"
// import FacebookIcon from "../assets/svgs/facebook"
import { Button } from "@mui/material"

const Login : React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
    // const [showPassword, setShowPassword] = useState<boolean>(false)
    // const handleClickShowPassword = () => setShowPassword((prev) => !prev)
    const handleClicked  = () => setIsVisible(true)
    return <div className="flex justify-between items-center relative h-screen bg-contain mx-[8%]" style={{backgroundImage: `linear-gradient(rgba(128, 128, 128, 0.2), rgba(128, 128, 128, 0.2)), url(${bg})`, justifyContent: 'space-around  '}}>
         <div className="flex justify-center items-center text-[red]"><img src={logo} alt="SPorlaze logo" className="w-[18rem] h-[18rem]" /></div>
        <div className="flex flex-col px-[1rem] rounded-[1rem] py-[1rem] w-[25rem]">
        <h1 className="text-5xl px-8 text-center font-bold">Welcome!</h1>
            <h1 className="text-xl text-left mt-6 mb-4 font-bold">Sign Up Now</h1>
            <div className="flex gap-2 flex-col text-center">
              <Link to='#' className="bg-white flex-1 text-black py-2 rounded-[1rem] font-bold"><div className="flex justify-center items-center gap-2"><GoogleIcon /><p>Sign Up with Google</p></div></Link>
              <Link to='#' className="bg-white flex-1 text-black py-2 rounded-[1rem] font-bold"><div className="flex justify-center items-center gap-2"><AppleIcon /><p>Sign Up with Apple</p></div></Link>
              <Button sx={{color: 'white', background: '#9a1b39', borderRadius: '1rem', textTransform: 'capitalize', padding: '10px'}} onClick={handleClicked}>Create Account</Button>
            </div>
            <p className="mt-2 text-[12px]">By sigining up you agreed to the <Link to='#' style={{textDecoration: 'underline', fontWeight: 'bold'}}>Terms of Service</Link> and <Link to='#' style={{textDecoration: 'underline', fontWeight: 'bold'}}>Privacy Policy</Link> including cookie use.</p>
            <div className="flex justify-between items-center gap-2 my-8">
              <div className="flex-1 h-[.1px] bg-white" />
              Already have an account ?
              <div className="flex-1 h-[.1px] bg-white" />

            </div>
            <Button sx={{color: 'white', background: '#463a85', borderRadius: '1rem', textTransform: 'capitalize', padding: '10px'}}>Create Account</Button>

            {/* comment the form box */}
            {/* <Box component={'form'}>
                <Box sx={{marginBottom: '1.8rem'}}>
                <Typography component='label' htmlFor="email" gutterBottom sx={{float: 'left'}}>Email</Typography>
                <input type="email" id="email" placeholder="username@gmail.com"  className="w-full p-2 pr-[1rem] border text-black border-gray-300 rounded transition duration-200 focus:border-green-500 hover:border-yellow-200 focus:bg-white outline-none "/>
                
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
                <div className="my-[1rem]"><p className="mt-[1rme] text-center text-sm">Or continue with</p></div>
                <div className="flex items-center justify-between gap-4 my-[1rem]">
                  <Link to="#" className="px-[2rem] py-2 rounded-[5px] bg-white text-black"><GoogleIcon /></Link>
                  <Link to="#" className="px-[2rem] py-2 rounded-[5px] bg-white text-black"><AppleIcon /></Link>
                  <Link to="#" className="px-[2rem] py-2 rounded-[5px] bg-white text-black"><FacebookIcon /></Link>
                </div>
                <p className="font-light text-center mb-4 text-sm">Don't have an account yet? <Link to='/signup' className="font-bold"> Register for free</Link></p>
            </Box> */}
        </div>
    </div>
}

export default Login
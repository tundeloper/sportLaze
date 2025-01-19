import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import bg from '../assets/background.jpg'
import logo from '../assets/whitelogo1.png'
import GoogleIcon from "../assets/svgs/googlesvg"
import AppleIcon from "../assets/svgs/apple"
import { Button } from "@mui/material"
import SignIn from "./signIn"
import SignUp from "./signUp"
import { SportlazeContext } from "../store/context"
import MUISnackbar from "../utils/snackBar"
import Overlay from "../utils/overlay"

const Login: React.FC = () => {
  const [signInIsVisible, setSignInIsVisible] = useState<boolean>(false)
  const [signUpIsVisible, setSignUpIsVisible] = useState<boolean>(false)

  const ctx = useContext(SportlazeContext)

  const handleSignInClicked = () => {
    setSignInIsVisible(true)
    setSignUpIsVisible(false)
  }

  const handleSignUpClicked = () => {
    setSignUpIsVisible(true)
    setSignInIsVisible(false)
  }
  const removeHandler = () => {
    setSignInIsVisible(false)
    setSignUpIsVisible(false)
  }
  const overlay = (signInIsVisible || signUpIsVisible)
  return <div className="flex justify-between items-center h-screen bg-contain sm:flex-row" style={{ backgroundImage: `linear-gradient(rgba(128, 128, 128, 0.2), rgba(128, 128, 128, 0.2)), url(${bg})`, justifyContent: 'space-around ', overflow: 'hidden' }}>
    {overlay && <div className="w-screen h-screen bg-[#c07a7a4d]" style={{ position: 'absolute' }} onClick={removeHandler} />}
    {ctx?.loading && <Overlay />}
    {<MUISnackbar />}
    <div className="flex-col justify-center items-center text-[red] hidden sm:block sm:flex-row"><img src={logo} alt="SPorlaze logo" className="w-[18rem] h-[18rem]" /></div>
    <div className="flex flex-col px-[1rem] relative rounded-[1rem] py-[1rem] w-[25rem]">
      <h1 className="text-5xl px-8 text-center font-bold">Welcome!</h1>
      <h1 className="text-xl text-left mt-6 mb-4 font-bold">Sign Up Now</h1>
      <div className="flex gap-3 flex-col text-center">
        <Link to='#' className="bg-white flex-1 text-black py-2 rounded-[2rem] font-bold"><div className="flex justify-center items-center gap-2"><GoogleIcon /><p>Sign Up with Google</p></div></Link>
        <Link to='#' className="bg-white flex-1 text-black py-2 rounded-[2rem] font-bold"><div className="flex justify-center items-center gap-2"><AppleIcon /><p>Sign Up with Apple</p></div></Link>
        <Button sx={{ color: 'white', background: '#9a1b39', borderRadius: '2rem', textTransform: 'capitalize', padding: '10px' }} onClick={handleSignUpClicked}>Create Account</Button>
      </div>
      <p className="mt-2 text-[12px]">By sigining up you agreed to the<Link to='#' style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Terms of Service</Link> and <Link to='#' style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Privacy Policy</Link> including cookie use.</p>
      <div className="flex justify-between items-center gap-2 my-8">
        <div className="flex-1 h-[.1px] bg-white" />
        Already have an account ?
        <div className="flex-1 h-[.1px] bg-white" />
      </div>
      <Button sx={{ color: 'white', background: '#463a85', borderRadius: '2rem', textTransform: 'capitalize', padding: '10px' }} onClick={handleSignInClicked}>Sign In</Button>
      <SignIn visible={signInIsVisible} setIsVisible={setSignInIsVisible} />
      <SignUp visible={signUpIsVisible} />
    </div>
  </div>
}

export default Login
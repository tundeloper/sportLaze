import { Button } from "@mui/material"
import logo from '../assets/whitelogo1.png'
import { Link } from "react-router-dom"
import GoogleIcon from "../assets/svgs/googlesvg"
import AppleIcon from "../assets/svgs/apple"
import { Dispatch, SetStateAction, useEffect } from "react"

const SignIn : React.FC<{visible: boolean, setIsVisible: Dispatch<SetStateAction<boolean>>}> = ({visible, setIsVisible}) => {
  //hadle esc keypress
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if(e.key === "Escape" && visible) setIsVisible(false)
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [visible, setIsVisible])

  return <div className={`flex flex-col px-[1rem] justify-between relative rounded-[1rem] bg-[#463a85] py-[1rem] w-[23rem] sliding-component ${visible ? 'slide-in' : 'slide-out'}`} style={{position: 'absolute'}}>
    <div className="flex justify-center gap-4 mt-4 mb-4">
      <p className="font-bold text-xl">Sign In to</p>
      <img src={logo} alt="sportlaze logo" className="w-[3rem] h-[3rem]" />
    </div>
    <div className="text-center">
      <div className="flex flex-col gap-6">
      <Link to='#' className="bg-white flex-1 text-black py-2 rounded-[1rem] font-bold"><div className="flex justify-center items-center gap-2"><GoogleIcon /><p>Sign In with Google</p></div></Link>
      <Link to='#' className="bg-white flex-1 text-black py-2 rounded-[1rem] font-bold"><div className="flex justify-center items-center gap-2"><AppleIcon /><p>Sign In with Apple</p></div></Link>
      
      </div>
      <div className="flex justify-between items-center gap-12 my-8">
        <div className="flex-1 h-[.1px] bg-white" />
          Sign In with
        <div className="flex-1 h-[.1px] bg-white" />
      </div>

      <div className="flex flex-col gap-4">
      <input placeholder="Email, Username or Phone" className="h-2" style={{textAlign: 'center', color: 'white', outline: 'none', margin: '0 3rem 0 3rem', height: '2rem', borderRadius: '2rem', border: '1px solid white', background: 'transparent', padding: '1.2rem', fontSize: ''}} />
      <input placeholder="Password" className="h-2" style={{textAlign: 'center', color: 'white', outline: 'none', margin: '0 3rem 0 3rem', height: '2rem', borderRadius: '2rem', border: '1px solid white', background: 'transparent', padding: '1.2rem'}} />
      <Link to="#"><p>Forgot Password</p></Link>
      <Button sx={{color: 'white', background: '#9a1b39', borderRadius: '2rem', textTransform: 'capitalize', padding: '10px', margin: '0 5rem 0 5rem'}}>Sign In</Button>
      </div>
    </div>

    <p className="text-center mb-2 ">Don't have an account? <Link to='#' className="font-bold" style={{textDecoration: 'underline'}}>Sign Up</Link></p>
  </div>
}

export default SignIn
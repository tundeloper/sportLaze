import { Button } from "@mui/material"
import logo from '../assets/whitelogo1.png'
import { Link } from "react-router-dom"
import GoogleIcon from "../assets/svgs/googlesvg"
import AppleIcon from "../assets/svgs/apple"
import { Dispatch, SetStateAction, useEffect,} from "react"
import axios from "axios"
import { useSportlaze } from "../hooks/useContext"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignInSchema } from "../utils/validator"


const SignIn: React.FC<{ visible: boolean, setIsVisible: Dispatch<SetStateAction<boolean>> }> = ({ visible, setIsVisible }) => {

  const { login, token } = useSportlaze()
  const navigate = useNavigate()
  //hadle esc keypress
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && visible) setIsVisible(false)
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [visible, setIsVisible])

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setUserData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const submitHandler = async () => {
  //   try {
  //     const response = await axios.post("https://lazeapi-2.onrender.com/signin/", { email: userData.email, password: userData.password })
  //     if (response.data?.access_token) {
  //       login(response.data?.access_token)
  //       console.log(response.data, token)
  //       console.log(token)
  //       navigate('/', { replace: true })
  //     }
  //     console.log(response.data)
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       console.log(error.status)
  //       console.log(error.message)
  //     }
  //   }
  // }

  return <div className={`flex flex-col justify-between relative rounded-[1rem] w-full bg-[#463a85] py-[1rem] px-[1rem] w-[23rem] sliding-component ${visible ? 'slide-in' : 'slide-out'} sm:w-[26rem] sm:py-[2.5rem] sm:px-[3rem]`} style={{ position: "absolute", left: 0, marginTop: '-3.5rem' }}>
    <div className="flex justify-center gap-4 mt-4 mb-4">
      <p className="font-bold text-xl">Sign In to</p>
      <img src={logo} alt="sportlaze logo" className="w-[3rem] h-[3rem]" />
    </div>
    <div className="text-center">
      <div className="flex flex-col gap-3">
        <Link to='#' className="bg-white flex-1 text-black py-2 rounded-[1rem] font-bold"><div className="flex justify-center items-center gap-2"><GoogleIcon /><p>Sign In with Google</p></div></Link>
        <Link to='#' className="bg-white flex-1 text-black py-2 rounded-[1rem] font-bold"><div className="flex justify-center items-center gap-2"><AppleIcon /><p>Sign In with Apple</p></div></Link>

      </div>
      <div className="flex justify-between items-center gap-10 my-8">
        <div className="flex-1 h-[.1px] bg-white" />
        Sign In with
        <div className="flex-1 h-[.1px] bg-white" />
      </div>
      <Formik
        initialValues={{ email: "", password: "",}}
        validationSchema={SignInSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("Form Submitted", values);
          try {
            const response = await axios.post("https://lazeapi-2.onrender.com/signin/", values)
            if (response.data?.access_token) {
              login(response.data?.access_token)
              console.log(response.data, token)
              console.log(token)
              navigate('/', { replace: true })
            }
            console.log(response.data)
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log(error.status)
              console.log(error.message)
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="flex flex-col gap-2">
            <ErrorMessage name="email" component="div" className="text-[red] text-[10px] mb-[-.7rem]" />
            <Field className={`w-full h-[40px] p-3 text-center mb-[.5rem] bg-[transparent] outline-none rounded border ${errors && touched ? 'border-[rgb(190, 63, 13)]' : 'border-[white]'}`} placeholder="Email, Username or Phone" name="email" style={{borderRadius: '3rem'}}/>
            <ErrorMessage name="password" component="div" className="text-[red] text-[10px] mb-[-.7rem]" />
            <Field className={`w-full h-[40px] p-3 text-center mb-[.5rem] bg-[transparent] outline-none rounded border ${errors && touched ? 'border-[rgb(190, 63, 13)]' : 'border-[white]'}`} placeholder="Password" name="password" style={{borderRadius: '3rem'}} type="password" />
            <Link to="#" style={{ textDecoration: 'underline' }}><p>Forgot Password?</p></Link>
            <Button sx={{ color: 'white', background: '#9a1b39', borderRadius: '2rem', textTransform: 'capitalize', padding: '10px', margin: '0 5rem 0 5rem' }} type="submit" disabled={isSubmitting}>Sign In</Button>
          </Form>
        )}
      </Formik>
    </div>

    <p className="text-center mb-2 mt-4">Don't have an account? <Link to='#' className="font-bold" style={{ textDecoration: 'underline' }}>Sign Up</Link></p>
  </div>
}

export default SignIn
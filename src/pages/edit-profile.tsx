import { Avatar, Button } from "@mui/material"
import UserProfile from "../components/userProfile/profile"
import user from "../assets/user/man-studio.png";
import { useSportlaze } from "../hooks/useContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { EditSchema } from "../utils/validator";


const EditProfile = () => {
    const { login, setLoading, setSnackIsOpen, setMessage } = useSportlaze()
    const navigate = useNavigate()


    return <UserProfile>
        <div className="flex bg-gradient-to-b from-[#463a85] to-[#9a1b39] p-[-16px] w-full h-[12rem] relative">
            <div className="absolute"></div>

            <div className="flex justify-center items-center absolute right-[2rem] bottom-[-2rem] h-[6rem] w-[6rem] border rounded-[100%]">
                <Avatar src={user} sx={{ width: 93, height: 93 }} />
                {/* <Avatar src="https://avatars.githubusercontent.com/u/67442529?v=4" sx={{ width: 93, height: 93 }} /> */}
            </div>
        </div>
        <Formik
            initialValues={{ name: "", bio: "", date_of_birth: "", website: "", location: "" }}
            validationSchema={EditSchema}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    setLoading(true)
                    setSnackIsOpen(false)
                    const response = await axios.post("https://lazeapi-2.onrender.com/signin/", values)
                    console.log(response.status)
                    if (response.data?.access_token) {
                        login(response.data?.access_token)
                        navigate('/', { replace: true })
                    } else {
                        throw new Error("Request failed");
                    }
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        // console.log(error.status)
                        if (error.message === "Network Error") {
                            setMessage({ message: error.message, error: true })
                        } else {
                            setMessage({ message: error.response?.data.detail, error: true })
                        }
                    }
                } finally {
                    setLoading(false)
                    setSnackIsOpen(true)
                    // setMessage({ message: 'Invalid email or password', error: true })
                    setTimeout(() => {
                        setSnackIsOpen(false)
                    }, 5000)
                }
            }}
        >
            {({ isSubmitting, errors, touched }) => (
                <Form className="flex flex-col gap-2 mt-10 p-2 px-4">
                    {/* name */}
                    <div className="flex justify-between gap-4">
                        <label htmlFor="name" className="font-bold">Name*</label>
                        <ErrorMessage name="name" component="div" className="text-[red] text-[12px] mb-[-.5rem]" />
                    </div>
                    <Field className={`w-full h-[40px] p-3 mb-[.5rem] bg-[transparent] outline-none  border-b ${errors && touched ? 'border-[rgb(190, 63, 13)]' : 'border-[white]'}`} placeholder="" id="name" name="name" type="name" />
                    {/* bio */}
                    <div className="flex justify-between gap-4">
                        <label htmlFor="bio" className="font-bold">Bio</label>
                        <ErrorMessage name="bio" component="div" className="text-[red] text-[12px] mb-[-.5rem]" />
                    </div>
                    <Field className={`w-full h-[40px] p-3 mb-[.5rem] bg-[transparent] outline-none  border-b ${errors && touched ? 'border-[rgb(190, 63, 13)]' : 'border-[white]'}`} placeholder="" id="bio" name="password" type="text" />
                    {/* date of birth */}
                    <div className="flex justify-between gap-4">
                        <label htmlFor="bio" className="font-bold">Date of Birth*</label>
                        <ErrorMessage name="date_of_birth" component="div" className="text-[red] text-[12px] mb-[-.5rem]" />
                    </div>
                    <Field className={`w-full h-[40px] p-3 mb-[.5rem] bg-[transparent] outline-none  border-b ${errors && touched ? 'border-[rgb(190, 63, 13)]' : 'border-[white]'}`} placeholder="" id="date_of_birth" name="date_of_birth" type="text" />
                    {/* website */}
                    <div className="flex justify-between gap-4">
                        <label htmlFor="website" className="font-bold">Website</label>
                        <ErrorMessage name="bio" component="div" className="text-[red] text-[12px] mb-[-.5rem]" />
                    </div>
                    <Field className={`w-full h-[40px] p-3 mb-[.5rem] bg-[transparent] outline-none  border-b ${errors && touched ? 'border-[rgb(190, 63, 13)]' : 'border-[white]'}`} placeholder="" id="website" name="website" type="text" />
                    {/* Location */}
                    <div className="flex justify-between gap-4">
                        <label htmlFor="location" className="font-bold">Location*</label>
                        <ErrorMessage name="location" component="div" className="text-[red] text-[12px] mb-[-.5rem]" />
                    </div>
                    <Field className={`w-full h-[40px] p-3 mb-[.5rem] bg-[transparent] outline-none  border-b ${errors && touched ? 'border-[rgb(190, 63, 13)]' : 'border-[white]'}`} placeholder="" id="location" name="lacation" type="location" />
                    {/* <Link to="#" style={{ textDecoration: 'underline' }}><p>Forgot Password?</p></Link> */}
                    <Button sx={{ color: 'white', background: '#9a1b39', borderRadius: '2rem', textTransform: 'capitalize', padding: '10px', margin: '0 5rem 0 5rem' }} type="submit" >Save</Button>
                </Form>
            )}
        </Formik>

    </UserProfile>
}

export default EditProfile
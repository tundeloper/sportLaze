import { Avatar, Button } from "@mui/material"
import UserProfile from "../components/userProfile/profile"
import avat from "../assets/user/man-studio.png";
import { useSportlaze } from "../hooks/useContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EditSchema } from "../utils/validator";
import baseUrl from "../utils/baseUrl";
import { useEffect } from "react";

const EditProfile = () => {
    const { login, setLoading, setSnackIsOpen, user, setMessage } = useSportlaze()
    const token = localStorage.getItem('access_token')
    const navigate = useNavigate()
    const url = baseUrl()

    return <UserProfile>
        <div className="flex bg-gradient-to-b from-[#463a85] to-[#9a1b39] p-[-16px] w-full h-[10rem] relative">
            <div className="absolute"></div>

            <div className="flex justify-center items-center absolute right-[2rem] bottom-[-2rem] h-[6rem] w-[6rem] border rounded-[100%]">
                <Avatar src={avat} sx={{ width: 93, height: 93 }} />
                {/* <Avatar src="https://avatars.githubusercontent.com/u/67442529?v=4" sx={{ width: 93, height: 93 }} /> */}
            </div>
        </div>
        <Formik
            initialValues={{ name: "", username: "", bio: "", date_of_birth: "", website: "", location: "" }}
            validationSchema={EditSchema}
            onSubmit={async (values, { setSubmitting }) => {
                console.log(values)
                try {
                    setLoading(true)
                    setSnackIsOpen(false)
                    const response = await fetch(`${url}/auth/${'tuns'}`, {
                        method: "PUT",
                        body: JSON.stringify({
                            "username": "ednut",
                            "name": "Frontend",
                            "date_of_birth": "2025-03-15",
                            "country": "US",
                            "favorite_sport": "SOccer",
                            "favorite_team": "Realmadrid"
                          
                          }),
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                      });
                    const data = await response.json();
                    
                    if (data.access_token) {
                        login(data.access_token)
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
                        <label htmlFor="name" className="font-bold dark:text-darkw">Name*</label>
                        <ErrorMessage name="name" component="div" className="text-[red] text-[12px] mb-[-.5rem]" />
                    </div>
                    
                    <Field className={`w-full h-[40px] p-3 mb-[.5rem] bg-[transparent] outline-none  border-b ${errors && touched ? 'border-[rgb(190, 63, 13)]' : 'border-[white]'} dark:text-darkw`} placeholder="" id="name" name="name" type="name" />

                    {/* username */}
                    <div className="flex justify-between gap-4">
                        <label htmlFor="name" className="font-bold dark:text-darkw">Username*</label>
                        <ErrorMessage name="username" component="div" className="text-[red] text-[12px] mb-[-.5rem]" />
                    </div>
                    
                    <Field className={`w-full h-[40px] p-3 mb-[.5rem] bg-[transparent] outline-none  border-b ${errors && touched ? 'border-[rgb(190, 63, 13)]' : 'border-[white]'} dark:text-darkw`} placeholder="" id="username" name="username" type="text" />
                    {/* bio */}
                    <div className="flex justify-between gap-4">
                        <label htmlFor="bio" className="font-bold dark:text-darkw">Bio</label>
                        <ErrorMessage name="bio" component="div" className="text-[red] text-[12px] mb-[-.5rem]" />
                    </div>
                    <Field className={`w-full h-[40px] p-3 mb-[.5rem] bg-[transparent] outline-none  border-b ${errors && touched ? 'border-[rgb(190, 63, 13)]' : 'border-[white]'} dark:text-darkw`} placeholder="" id="bio" name="bio" type="text" />
                    {/* date of birth */}
                    <div className="flex justify-between gap-4">
                        <label htmlFor="bio" className="font-bold dark:text-darkw">Date of Birth*</label>
                        <ErrorMessage name="date_of_birth" component="div" className="text-[red] text-[12px] mb-[-.5rem]" />
                    </div>
                    <Field className={`w-full h-[40px] p-3 mb-[.5rem] bg-[transparent] outline-none  border-b ${errors && touched ? 'border-[rgb(190, 63, 13)]' : 'border-[white]'} dark:text-darkw`} placeholder="" id="date_of_birth" name="date_of_birth" type="text" />
                    {/* website */}
                    <div className="flex justify-between gap-4">
                        <label htmlFor="website" className="font-bold dark:text-darkw">Website</label>
                        <ErrorMessage name="bio" component="div" className="text-[red] text-[12px] mb-[-.5rem]" />
                    </div>
                    <Field className={`w-full h-[40px] p-3 mb-[.5rem] bg-[transparent] outline-none  border-b ${errors && touched ? 'border-[rgb(190, 63, 13)]' : 'border-[white]'} dark:text-darkw`} placeholder="" id="website" name="website" type="text" />
                    {/* Location */}
                    <div className="flex justify-between gap-4">
                        <label htmlFor="location" className="font-bold dark:text-darkw">Location*</label>
                        <ErrorMessage name="location" component="div" className="text-[red] text-[12px] mb-[-.5rem]" />
                    </div>
                    <Field className={`w-full h-[40px] p-3 mb-[.5rem] bg-[transparent] outline-none  border-b ${errors && touched ? 'border-[rgb(190, 63, 13)]' : 'border-[white]'} dark:text-darkw`} placeholder="" id="location" name="location" type="text" />
                    {/* <Link to="#" style={{ textDecoration: 'underline' }}><p>Forgot Password?</p></Link> */}
                    <Button sx={{ color: 'white', background: '#9a1b39', borderRadius: '2rem', textTransform: 'capitalize', padding: '10px', margin: '0 5rem 0 5rem', marginTop: '2rem' }} type="submit" >Save</Button>
                </Form>
            )}
        </Formik>

    </UserProfile>
}

export default EditProfile
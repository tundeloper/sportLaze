import React, { useState } from "react"
import { Button, IconButton, Typography } from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CountriesDropDown from "../components/auth/contrydropdown"
import FavSport from "../components/auth/FavSport"
// import FavTeam from "../components/FavTeam"
import DOB from "../components/auth/DOB"
import { SingleValue } from "react-select"
import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "../utils/validator";
import { useSportlaze } from "../hooks/useContext";

// import MUISnackbar from "../utils/snackBar";

// interface userData {
//     name: string,
//     email: string,
//     date_of_birth: string,
//     country: string,
//     favorite_sport: string,
//     favorite_team: string,
//     password:string,
//   }

interface formprps { name: string, email: string, password?: string, dateOfBirth: string, country: SingleValue<{ label: string, value: string, }>, favSport: SingleValue<{ label: string, value: string, }>, FavSportTeam: SingleValue<{ label: string, value: string, }> }

const SignUp: React.FC<{ visible: boolean }> = ({ visible }) => {
    const [userData, setUserData] = useState<formprps>({ name: '', email: '', dateOfBirth: '2014-12-14', country: { label: '', value: '' }, favSport: { label: '', value: '' }, FavSportTeam: { label: '', value: '' } })
    const [showPassword, setShowPassword] = useState(false);

  const { login, setLoading, setSnackIsOpen, setMessage } = useSportlaze()

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };


    return <div className={`flex hidden flex-col justify-center items-center py-[2rem] px-[.8rem] text-black rounded-[1rem] bg-[white] w-full scale ${visible ? 'reset-position' : 'scale-down'} sm:w-[26rem] sm:py-[2.5rem] sm:px-[3rem]`} style={{ position: "absolute", left: '0', marginTop: '-3rem' }}>
        <Formik
            initialValues={{ email: "", password: "", name: "", favorite_team: "", }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                const credential = {...values, date_of_birth: userData.dateOfBirth, country: userData.country?.value, favorite_sport: userData.favSport?.value}
                try {
                    setLoading(true)
                    setSnackIsOpen(false)
                    const response = await axios.post(`https://lazeapi-v1.onrender.com/v1/auth/signup`, 
                        {
                            username: credential.name,
                            email: credential.email,
                            date_of_birth: credential.date_of_birth,
                            country: credential.country,
                            favorite_sport: credential.favorite_sport,
                            favorite_team: credential.favorite_team,
                            password: credential.password
                            }
                    )
                    console.log(response)
                    if (response.status === 200) {
                        setMessage({ message: "successfuly", error: false });
                        login(response.data?.access_token)
                    } else {
                        throw new Error("Request failed");
                    }
                } catch (error) {
                    console.log(error)
                    if (axios.isAxiosError(error)) {
                        console.log(error.response?.data.detail[1])
                        if (error.message === "Network Error") {
                            setMessage({ message: error.message, error: true })
                          } else {
                            console.log(error.response?.data.detail[1].msg)
                            setMessage({message: error.response?.data.detail, error: true })
                          }
                    }
                } finally {
                    setLoading(false)
                    setSnackIsOpen(true)
                    setTimeout(() => {
                        setSnackIsOpen(false)
                    }, 5000)
                }
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, errors, touched }) => (
                <Form>
                    <ErrorMessage name="name" component="div" className="text-[red] text-[10px]" />
                    <Field
                        type="text"
                        name="name"
                        className={`w-full h-[40px] pl-3 mb-[.5rem] outline-none border-2 ${errors.email && touched.email ? "border-[rgb(190, 63, 13)]" : ""} border-[rgb(181, 179, 187)] rounded`} placeholder="Username"
                    />
                    <ErrorMessage name="email" component="div" className="text-[red] text-[10px]" />
                    <Field className={`w-full h-[40px] pl-3 mb-[.5rem] rounded border-2 ${errors && touched ? 'border-[rgb(190, 63, 13)]' : 'border-[rgb(181, 179, 187)] rounded'} rounded outline-none`} placeholder="Email" name="email" />
                    <ErrorMessage name="password" component="div" className="text-[red] text-[10px]" />
                    <div className="relative mb-2">
                        <Field type={showPassword ? 'text' : 'password'} name="password"
                            placeholder="Password" className="w-full h-[40px] text-secondary pl-3 " style={{ borderRadius: '.2rem', outline: 'none', border: '.1px solid rgb(181, 179, 187)' }} />
                        <div style={{ position: 'absolute', top: '1px', right: '5px' }}><IconButton onClick={togglePasswordVisibility}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton></div>
                    </div>

                    <Typography gutterBottom >Date of Birth</Typography>
                    <DOB setUserData={setUserData} userData={userData} />
                    <p className="text-[13px] mb-2">Your Date of Birth will not appear on your profile. Please confirm your real age</p>
                    <div className="mb-3">
                        <CountriesDropDown setUserData={setUserData} userData={userData} />
                    </div>
                    <div className="mb-3">
                        <FavSport setUserData={setUserData} userData={userData} />
                    </div>
                    <div className="mb-4">
                        <ErrorMessage name="favorite_team" component="div" className="text-[red] text-[10px]" />
                        <Field
                            type="name"
                            name="favorite_team"
                            className={`w-full h-[40px] pl-3 mb-[.5rem] outline-none border-2 ${errors.favorite_team && touched.favorite_team ? "border-[rgb(190, 63, 13)]" : ""} border-[rgb(181, 179, 187)] rounded`} placeholder="Favourite team"
                        />
                    </div>

                    <div className="flex justify-center w-full">
                        <Button sx={{ color: 'white', background: '#463a85', borderRadius: '2rem', textTransform: 'capitalize', padding: '10px 2.5rem', }} type="submit" disabled={isSubmitting}>Create Account</Button>
                    </div>
                </Form>
            )}
        </Formik>
    </div >
}

export default SignUp
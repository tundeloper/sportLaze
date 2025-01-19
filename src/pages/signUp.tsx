import React, { useContext, useState } from "react"
import { Button, IconButton, Typography } from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CountriesDropDown from "../components/contrydropdown"
import FavSport from "../components/FavSport"
// import FavTeam from "../components/FavTeam"
import DOB from "../components/DOB"
import { SingleValue } from "react-select"
import axios from "axios"
import { SportlazeContext } from "../store/context";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchema from "../utils/validator";

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

    const ctx = useContext(SportlazeContext)

    // useEffect(() => {console.log(ctx?.errorMesssage + 'jjjj')}, [ctx])

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    // const userCredentials = {
    //     name: userData.name,
    //     email: userData.email,
    //     date_of_birth: userData.dateOfBirth,
    //     country: userData.country?.value,
    //     favorite_sport: userData.favSport?.value,
    //     favorite_team: userData.FavSportTeam?.value,
    //     password: userData.password
    //     '123u3uu'
    // }

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setUserData((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     console.log(userCredentials)
    //     try {
    //         ctx?.setLoading(true)
    //         ctx?.setSnackIsOpen(false)
    //         const response = await axios.post("https://lazeapi-2.onrender.com/signup/", userCredentials)
    //         console.log(response.status)
    //         if (response.status === 200) {
    //             ctx?.setMessage({ message: response.data.message, error: false });
    //         } else {
    //             throw new Error("Request failed");
    //         }
    //     } catch (error) {
    //         if (axios.isAxiosError(error)) {
    //             // console.log(error.status)
    //             ctx?.setMessage({ message: error.message, error: true })
    //         }
    //     } finally {
    //         ctx?.setLoading(false)
    //         ctx?.setSnackIsOpen(true)
    //         setTimeout(() => {
    //             ctx?.setSnackIsOpen(false)
    //         }, 5000)
    //     }
    // }
    // date: '', country: '', favSport: '', favTeam: '' 

    return <div className={`flex hidden flex-col justify-center items-center py-[2rem] px-[.8rem] text-black rounded-[1rem] bg-[white] w-full scale ${visible ? 'reset-position' : 'scale-down'} sm:w-[26rem] sm:py-[2.5rem] sm:px-[3rem]`} style={{ position: "absolute", left: '0', marginTop: '-3rem' }}>
        <Formik
            initialValues={{ email: "", password: "", name: "", favorite_team: "", }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                console.log("Form Submitted", values);
                const credential = {...values, date_of_birth: userData.dateOfBirth, country: userData.country?.value, favorite_sport: userData.favSport?.value}
                console.log(credential)
                try {
                    ctx?.setLoading(true)
                    ctx?.setSnackIsOpen(false)
                    const response = await axios.post("https://lazeapi-2.onrender.com/signup/", credential)
                    console.log(response.status)
                    if (response.status === 200) {
                        ctx?.setMessage({ message: response.data.message, error: false });
                    } else {
                        throw new Error("Request failed");
                    }
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        // console.log(error.status)
                        ctx?.setMessage({ message: error.message, error: true })
                    }
                } finally {
                    ctx?.setLoading(false)
                    ctx?.setSnackIsOpen(true)
                    setSubmitting(false);
                    setTimeout(() => {
                        ctx?.setSnackIsOpen(false)
                    }, 5000)
                }
            }}
        >
            {({ isSubmitting, errors, touched }) => (
                <Form>
                    <ErrorMessage name="name" component="div" className="text-[red] text-[10px]" />
                    <Field
                        type="name"
                        name="name"
                        className={`w-full h-[40px] pl-3 mb-[.5rem] outline-none border-2 ${errors.email && touched.email ? "border-[rgb(190, 63, 13)]" : ""} border-[rgb(181, 179, 187)] rounded`} placeholder="Name"
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
                        {/* <FavTeam setUserData={setUserData} userData={userData} /> */}
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
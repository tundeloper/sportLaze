import React, { useContext, useState } from "react"
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CountriesDropDown from "../components/contrydropdown"
import FavSport from "../components/FavSport"
import FavTeam from "../components/FavTeam"
import DOB from "../components/DOB"
import { SingleValue } from "react-select"
import axios from "axios"
import { SportlazeContext } from "../store/context";
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

    const userCredentials = {
        name: userData.name,
        email: userData.email,
        date_of_birth: userData.dateOfBirth,
        country: userData.country?.value,
        favorite_sport: userData.favSport?.value,
        favorite_team: userData.FavSportTeam?.value,
        password: userData.password
        // '123u3uu'
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(userCredentials)
        try {
            ctx?.setLoading(true)
            ctx?.setSnackIsOpen(false)
            const response = await axios.post("https://lazeapi-2.onrender.com/signup/", userCredentials)
            console.log(response.status)
            if (response.status === 200) {
                ctx?.setMessage({message : response.data.message, error: false});
              } else {
                throw new Error("Request failed");
              }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // console.log(error.status)
                ctx?.setMessage({message: error.message, error: true})
            }
        } finally {
            ctx?.setLoading(false)
            ctx?.setSnackIsOpen(true)
            setTimeout(() => {
            ctx?.setSnackIsOpen(false)
            }, 5000)
        }
    }


    return <div className={`flex hidden flex-col p-[2rem] justify-center items-center text-black rounded-[1rem] bg-[white] w-[23rem] scale ${visible ? 'reset-position' : 'scale-down'}`} style={{ position: "absolute", marginTop: '-3rem' }}>
        <Box component="form" className="w-full" onSubmit={handleSubmit}>
            {/* <input placeholder="Name" style={{outline: 'none'}} className="mb-2" /> */}
            <TextField fullWidth placeholder="Name" style={{ marginBottom: '.5rem' }} name="name" value={userData.name} onChange={handleInputChange} />
            <TextField fullWidth placeholder="Email" style={{ marginBottom: '.5rem' }} name="email" value={userData.email} onChange={handleInputChange} />
            <TextField
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                fullWidth
                onChange={handleInputChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility} edge="end">
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            {/* <TextField fullWidth placeholder="Password" style={{marginBottom: '.5rem'}}/> */}
            <Typography gutterBottom >Date of Birth</Typography>
            <DOB setUserData={setUserData} userData={userData} />
            <p className="text-a[12px] mb-2">Your Date of Birth will not appear on your profile. Please confirm your real age</p>
            <div className="mb-4">
                <CountriesDropDown setUserData={setUserData} userData={userData} />
            </div>
            <div className="mb-4">
                <FavSport setUserData={setUserData} userData={userData} />
            </div>
            <div className="mb-4">
                <FavTeam setUserData={setUserData} userData={userData} />
            </div>
            {/* <TextField fullWidth placeholder="Favourite Sport" style={{marginBottom: '.5rem'}}/>
            <TextField fullWidth placeholder="Favourite Sport Team"/> */}
            <div className="flex justify-center w-full">
                <Button sx={{ color: 'white', background: '#463a85', borderRadius: '2rem', textTransform: 'capitalize', padding: '10px 2.5rem', }} type="submit">Create Account</Button>
            </div>
        </Box>
    </div>
}

export default SignUp
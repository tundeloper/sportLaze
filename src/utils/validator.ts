import * as Yup from "yup"
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        // .matches(/^[a-zA-Z0-9]+$/, "Password must be alphanumeric")
        .required("Password is required"),
    //   date: Yup.object().required('Please select a date'),
    //   country: Yup.object().required('Please select a country'),
    //   FavSport: Yup.object().required('Please select a Favourite Sport'),
    favorite_team: Yup.string().required('Please enter your favourite Team'),
});

export const SignInSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
        .required("Password is required")
});

export const EditSchema = Yup.object({
    name: Yup.string().required("name is required"),
    bio: Yup.string(),
    date_of_birth: Yup.string().required("Date of birth is required"),
    website: Yup.string(),
    location: Yup.string().required("location is required"),
});

// export const validateSelect = async ({dateOfBirth: string, country, favSport}) => {
    // try{
    //     if(dateOfBirth === '' || dateOfBirth === null ) throw Error('Please enter a valid date')
    //     if(country === '' || country === null) throw Error('Please enter a valid date')
    //     if(favSport === '' || favSport === null) throw Error('Please select a favourite sportS')

    // } catch(err) {
    //     return err
    // }
// }

export default validationSchema
import { Avatar, Button } from "@mui/material";
import UserProfile from "../components/userProfile/profile";
import avat from "../assets/user/man-studio.png";
import { useSportlaze } from "../hooks/useContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EditSchema } from "../utils/validator";
import baseUrl from "../utils/baseUrl";

const EditProfile = () => {
  const { login, setLoading, setSnackIsOpen, user, setMessage, setUser } =
    useSportlaze();
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const url = baseUrl();

  return (
    <UserProfile>
      <div className="flex bg-gradient-to-b from-[#463a85] to-[#9a1b39] p-[-16px] w-full h-[10rem] relative">
        <div className="absolute"></div>

        <div className="flex justify-center items-center absolute right-[2rem] bottom-[-2rem] h-[6rem] w-[6rem] border rounded-[100%]">
          <Avatar src={avat} sx={{ width: 93, height: 93 }} />
        </div>
      </div>
      <Formik
        initialValues={{
          name: "",
          username: "",
          bio: "",
          date_of_birth: "",
          website: "https://",
          location: "",
        }}
        validationSchema={EditSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true);
          console.log(values.website)
          const formData = new URLSearchParams();
          formData.append("name", values.name);
          formData.append("username", values.username);
          formData.append("bio", values.bio);
          formData.append("date_of_birth", values.date_of_birth);
          formData.append("website", values.website);
          formData.append("location", values.location);
          const date = new Date(values.date_of_birth)
          console.log( `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`)
          const data = {
           name: values.name,
    username: values.username,
    bio: values.bio,
    date_of_birth: "1995-06-15",
    website: values.website,
    location: values.location
          }
          try {
            const {data} = await axios.put(
              `${url}/auth/${user?.username}`,
              {
                values
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            if (data) {
              // setUser({
              //   bio: data.user.bio
              // })
              navigate(`/user/${user.username}`)
            }
          } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
              // setSnackIsOpen(true);
              setMessage({
                // message: error.response?.data?.detail || "An error occurred",
                message: "An error occurred",
                error: true,
              });
            }
          } finally {
            setLoading(false);
            setTimeout(() => setSnackIsOpen(false), 5000);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-2 mt-10 p-2 px-4">
            {[
              { label: "Name*", name: "name", type: "text" },
              { label: "Username*", name: "username", type: "text" },
              { label: "Bio", name: "bio", type: "text" },
              { label: "Date of Birth*", name: "date_of_birth", type: "text" },
              { label: "Website", name: "website", type: "text" },
              { label: "Location*", name: "location", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <div className="flex justify-between gap-4">
                  <label htmlFor={name} className="font-bold dark:text-darkw">
                    {label}
                  </label>
                  <ErrorMessage name={name}>
                    {(msg) =>
                      typeof msg === "string" ? (
                        <div className="text-[red] text-[12px] mb-[-.5rem]">
                          {msg}
                        </div>
                      ) : null
                    }
                  </ErrorMessage>
                </div>
                <Field
                  className={`w-full h-[40px] p-3 mb-[.5rem] bg-[transparent] outline-none border-b 
                    // errors[name] && touched[name] ? "border-[rgb(190, 63, 13)]" : "border-[white]"
                  dark:text-darkw`}
                  id={name}
                  name={name}
                  type={type}
                />
              </div>
            ))}
            <Button
              sx={{
                color: "white",
                background: "#9a1b39",
                borderRadius: "2rem",
                textTransform: "capitalize",
                padding: "10px",
                margin: "0 5rem 0 5rem",
                marginTop: "2rem",
              }}
              type="submit"
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </UserProfile>
  );
};

export default EditProfile;

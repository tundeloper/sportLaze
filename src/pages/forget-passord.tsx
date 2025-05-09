import React from "react";
import bg from "../assets/background.jpg";
import logo from "../assets/whitelogo1.png";
// import GoogleIcon from "../assets/svgs/googlesvg"
import MUISnackbar from "../utils/snackBar";
import Overlay from "../utils/overlay";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useSportlaze } from "../hooks/useContext";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import baseUrl from "../utils/baseUrl";

const ForgetPassword: React.FC = () => {
  const { loading, setSnackIsOpen, setMessage, setLoading } = useSportlaze();
  const url = baseUrl();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  //   const overlay = signInIsVisible || signUpIsVisible;

  return (
    <div
      className="flex justify-between items-center h-screen bg-contain sm:flex-row"
      style={{
        backgroundImage: `linear-gradient(rgba(128, 128, 128, 0.2), rgba(128, 128, 128, 0.2)), url(${bg})`,
        justifyContent: "space-around ",
        overflow: "hidden",
      }}
    >
      {loading && <Overlay />}
      {<MUISnackbar />}
      <div className="flex-col justify-center items-center text-[red] hidden sm:block sm:flex-row">
        <img src={logo} alt="SPorlaze logo" className="w-[18rem] h-[18rem]" />
      </div>
      <div className="flex flex-col px-[1rem] relative bg-[#463a85] rounded-[1rem] py-[1.5rem] min-w-[25rem]">
        {/* <h1 className="text-5xl px-8 text-center font-bold">Welcome!</h1> */}
        <h1 className="text-xl font-semibold mt-3 mb-2 text-center">
          Eneter Your Emal to continue
        </h1>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email format")
              .required("Email is required"),
          })}
          onSubmit={async (values) => {
            const params = new URLSearchParams({
              email: values.email,
              from: "forget-password",
            });
            try {
                setLoading(true);
              const { data } = await axios.post(
                `${url}/auth/reset-password-request`,
                {
                  email: values.email,
                }
              );

              if (data) {
                setSnackIsOpen(true);
                navigate(`/auth/verification?${params.toString()}`);
                setMessage({ message: data.message, error: false });
                console.log("OTP sent successfully", data);
              }
            } catch (error) {
              console.error("Error verifying OTP:", error);
            } finally {
              setTimeout(() => {
                setLoading(false);
                setSnackIsOpen(false);
              }, 3000);
            }
            // Handle OTP submission here
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-2"
            >
              {/* <label htmlFor="password" className="text-white">
                Password
              </label> */}

              <ErrorMessage
                name="email"
                component="div"
                className="text-[red] text-sm mb-2"
              />
              <div className="relative mb-2">
                <Field
                  type={"email"}
                  name="email"
                  id="email"
                  autoComplete="off"
                  placeholder="Enter your email"
                  //   onchange={handleChange}
                  //   value={values.password}
                  className="w-full h-[40px] text-secondary pl-3 "
                  style={{
                    borderRadius: ".2rem",
                    outline: "none",
                    border: ".1px solid rgb(181, 179, 187)",
                  }}
                />
              </div>
              <button
                type="submit"
                className="bg-primary font-bold text-white py-2 rounded-lg"
              >
                Next
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgetPassword;

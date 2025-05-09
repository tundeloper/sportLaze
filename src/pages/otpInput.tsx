import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import baseUrl from "../utils/baseUrl";
import { useSportlaze } from "../hooks/useContext";

const OtpComponent: React.FC<{}> = () => {
  //   const navigate = useNavigate();
  const location = useLocation();
  const navigate = useNavigate();
  const { login, setInitUser } = useSportlaze();
  const searchParams = new URLSearchParams(location.search);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const email = searchParams.get("email");
  const from = searchParams.get("from");

  //hadle esc keypress
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // if (e.key === "Escape" && visible) setIsVisible(false);
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  //   const url = baseUrl()
  const [otp, setOtp] = useState("");
  const url = baseUrl();

  return (
    <>
      <div
        className={`flex flex-col items-center justify-between relative rounded-[1rem] bg-[#463a85] px-[1rem] sliding-component sm:py-[1.5rem] sm:px-[1rem]`}
      >
        {/* <h2 className="text-xl font-semibold">Enter OTP</h2> */}
        <p className="text-center text-white mb-4">
          {error ? error : "Enter the OTP sent to your email"}
        </p>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputType="text"
          shouldAutoFocus
          containerStyle="flex "
          renderSeparator={<span className="w-2" />}
          renderInput={(props) => (
            <input
              {...props}
              style={{ width: "3rem", height: "3rem" }}
              className="text-center border rounded-lg text-black text-2xl font-bold border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        />
      </div>
      <Formik
        initialValues={{ password: "" }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            // .matches(/^[a-zA-Z0-9]+$/, "Password must be alphanumeric")
            .required("Password is required"),
        })}
        onSubmit={async (values) => {
          try {
            let response: { data: any };
            if (from === "forget-password") {
              response = await axios.post(`${url}/auth/reset-password`, {
                email: email,
                otp: otp,
                password: values.password,
              });
            } else {
              response = await axios.post(`${url}/auth/verify-otp`, {
                email: email,
                otp: otp,
                password: values.password,
              });
            }

            if (response.data) {
              login(response.data?.access_token);
              setInitUser({
                access_token: response.data.access_token,
                token_type: "bearer",
                email: response.data?.user?.email,
                username: response.data?.user?.username,
                id: response.data?.user?.id,
              });
              navigate("/", { replace: true });
              localStorage.setItem("username", response.data?.user?.username);
            }
          } catch (error) {
            console.error("Error verifying OTP:", error);
            setError("Invalid OTP or password");
            if (axios.isAxiosError(error)) {
              if (error.response) {
                setError(error.response.data.detail);
              } else if (error.request) {
                setError("Network error, please try again later.");
              } else {
                setError(error.message);
              }
            }
          }
          // Handle OTP submission here
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <Form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
            <label htmlFor="password" className="text-white">
              Password
            </label>

            <ErrorMessage
              name="password"
              component="div"
              className="text-[red] text-sm mb-2"
            />
            <div className="relative mb-2">
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                autoComplete="off"
                placeholder="Password"
                onchange={handleChange}
                value={values.password}
                className="w-full h-[40px] text-secondary pl-3 "
                style={{
                  borderRadius: ".2rem",
                  outline: "none",
                  border: ".1px solid rgb(181, 179, 187)",
                }}
              />
              <div style={{ position: "absolute", top: "1px", right: "5px" }}>
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-lg"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default OtpComponent;

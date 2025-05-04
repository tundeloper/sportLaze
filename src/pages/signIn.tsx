import { Button } from "@mui/material";
import logo from "../assets/whitelogo1.png";
import { Link } from "react-router-dom";
import AppleIcon from "../assets/svgs/apple";
import { Dispatch, SetStateAction, useEffect } from "react";
import axios from "axios";
import { useSportlaze } from "../hooks/useContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignInSchema } from "../utils/validator";
import GoogleLoginButton from "../utils/googleLoginBtn";
import baseUrl from "../utils/baseUrl";

const SignIn: React.FC<{
  visible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  handleOtp: () => {};
}> = ({ visible, setIsVisible, handleOtp }) => {
  const { login, setLoading, setSnackIsOpen, setMessage, setInitUser } =
    useSportlaze();
  const navigate = useNavigate();
  //hadle esc keypress
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && visible) setIsVisible(false);
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [visible, setIsVisible]);

  const url = baseUrl()

  return (
    <div
      className={`flex flex-col justify-between relative rounded-[1rem] w-full bg-[#463a85] py-[1rem] px-[1rem] w-[23rem] sliding-component ${
        visible ? "slide-in" : "slide-out"
      } sm:w-[26rem] sm:py-[2.5rem] sm:px-[3rem]`}
      style={{ position: "absolute", left: 0, marginTop: "-3.5rem" }}
    >
      <div className="flex justify-center gap-4 mt-4 mb-4">
        <p className="font-bold text-xl">Sign In to</p>
        <img src={logo} alt="sportlaze logo" className="w-[3rem] h-[3rem]" />
      </div>
      <div className="text-center">
        <div className="flex flex-col gap-3">
          <GoogleLoginButton rounded={"1rem"} title="Sign In with Google" />
          <Link
            to="#"
            className="bg-white flex-1 text-black py-2 rounded-[1rem] font-bold"
          >
            <div className="flex justify-center items-center gap-2">
              <AppleIcon />
              <p>Sign In with Apple</p>
            </div>
          </Link>
        </div>
        <div className="flex justify-between items-center gap-10 my-8">
          <div className="flex-1 h-[.1px] bg-white" />
          Sign In with
          <div className="flex-1 h-[.1px] bg-white" />
        </div>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const formData = new URLSearchParams();
              formData.append("username", values.username);
              formData.append("password", values.password);
              setLoading(true);
              setSnackIsOpen(false);
              const response = await axios.post(
                `${url}/auth/token`,
                formData
              );
              const { data } = response;
              if (data.access_token) {
                login(data?.access_token);
                setInitUser({
                  access_token: data.access_token,
                  token_type: "bearer",
                  email: data?.user?.email,
                  username: data?.user?.username,
                  id: data?.user?.id,
                });
                navigate("/", { replace: true });
                localStorage.setItem("username", data?.user?.username);
              } else {
                throw new Error("Request failed");
              }
            } catch (error) {
              setSnackIsOpen(true);
              if (axios.isAxiosError(error)) {
                setLoading(false)
                console.log(error);
                if (error.message === "Network Error") {
                  setMessage({ message: error.message, error: true });
                } else { 
                  setMessage({
                    message: error.response?.data.detail,
                    error: true,
                  });
                }
              }
            } finally {
              setLoading(false);
              setSnackIsOpen(false);
              // setMessage({ message: 'Invalid email or password', error: true })
              setTimeout(() => {
                setSnackIsOpen(false);
              }, 5000);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="flex flex-col gap-2">
              <ErrorMessage
                name="username"
                component="div"
                className="text-[red] text-[12px] mb-[-.5rem]"
              />
              <Field
                className={`w-full h-[40px] p-3 text-center mb-[.5rem] bg-[transparent] outline-none rounded border ${
                  errors && touched
                    ? "border-[rgb(190, 63, 13)]"
                    : "border-[white]"
                }`}
                placeholder="Email, Username or Phone"
                name="username"
                type="text"
                style={{ borderRadius: "3rem" }}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-[red] text-[12px] mb-[-.5rem]"
              />
              <Field
                className={`w-full h-[40px] p-3 text-center mb-[.5rem] bg-[transparent] outline-none rounded border ${
                  errors && touched
                    ? "border-[rgb(190, 63, 13)]"
                    : "border-[white]"
                }`}
                placeholder="Password"
                name="password"
                style={{ borderRadius: "3rem" }}
                type="password"
              />
              <button style={{ textDecoration: "underline" }} onClick={() => {handleOtp()}}>
                <p>Forgot Password?</p>
              </button>
              <Button
                sx={{
                  color: "white",
                  background: "#9a1b39",
                  borderRadius: "2rem",
                  textTransform: "capitalize",
                  padding: "10px",
                  margin: "0 5rem 0 5rem",
                }}
                type="submit"
                disabled={isSubmitting}
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <p className="text-center mb-2 mt-4">
        Don't have an account?
        <Button
          className="font-bold"
          style={{
            textDecoration: "underline",
            textTransform: "capitalize",
            color: "white",
          }}
          onClick={() => {
            setIsVisible(false);
          }}
        >
          Sign Up
        </Button>
      </p>
    </div>
  );
};

export default SignIn;

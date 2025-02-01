import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import GoogleIcon from "../assets/svgs/googlesvg";
import { useSportlaze } from "../hooks/useContext";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate()

  const { login, setMessage, setLoading, setSnackIsOpen } = useSportlaze()

  const loginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // console.log("Encoded JWT ID token:", tokenResponse.access_token);
        const { data } = await axios.post("https://lazeapi-2.onrender.com/google-signin/", {
          token: tokenResponse.access_token,
        });
        // console.log(data, 'data')
        if (data.access_token) {
          //   localStorage.setItem("access_token", data.access_token);
          login(data.access_token)
          navigate('/', { replace: true })

        } else {
          alert("Login failed: " + data.detail);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
              // console.log(error.status)
              if (error.message === "Network Error") {
                setMessage({ message: error.message, error: true })
              } else {
                setMessage({message: error.response?.data.detail, error: true })
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
    },
    onError: () => setMessage({ message: 'Invalid email or password', error: true }),
  });

  return (
    <button
      onClick={() => loginHandler()}
      className="flex items-center justify-center gap-2 bg-white border border-gray-300 shadow-md px-5 py-2 rounded-full font-bold text-black hover:bg-gray-100 transition duration-300"
    >
      <GoogleIcon />
      <span className="font-bold">Sign up with Google</span>
    </button>
  );
};

export default GoogleLoginButton
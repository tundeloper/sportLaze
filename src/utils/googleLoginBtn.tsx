import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import GoogleIcon from "../assets/svgs/googlesvg";

const GoogleLoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
        console.log(tokenResponse)
      try {
        const { data } = await axios.post("https://lazeapi-2.onrender.com/google-signin/", {
          token: tokenResponse.access_token,
        });

        if (data.access_token) {
        //   localStorage.setItem("access_token", data.access_token);
          alert("Login successful!");
        } else {
          alert("Login failed: " + data.detail);
        }
      } catch (error) {
        console.error("Google Sign-In error:", error);
        alert("An error occurred during login.");
      }
    },
    onError: () => console.error("Login Failed"),
  });

  return (
    <button
      onClick={() => login()}
      className="flex items-center justify-center gap-2 bg-white border border-gray-300 shadow-md px-5 py-2 rounded-full font-bold text-black hover:bg-gray-100 transition duration-300"
    >
      <GoogleIcon />
      <span className="font-bold">Sign up with Google</span>
    </button>
  );
};

export default GoogleLoginButton
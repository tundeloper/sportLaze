import React from "react";
import bg from "../assets/background.jpg";
import logo from "../assets/whitelogo1.png";
// import GoogleIcon from "../assets/svgs/googlesvg"
import MUISnackbar from "../utils/snackBar";
import Overlay from "../utils/overlay";
import { useSportlaze } from "../hooks/useContext";
import OtpComponent from "./otpInput";

const Verification: React.FC = () => {
 
  const { loading } = useSportlaze();

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
        <p>OTP was sent to your email, to continue enter the OTP here </p>
        {/* <h1 className="text-xl font-semibold mt-3">Eneter Pin here</h1> */}
        <OtpComponent />
      </div>
    </div>
  );
};

export default Verification;

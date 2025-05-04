import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';

const OtpComponent: React.FC<{
  visible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}> = ({ visible, setIsVisible }) => {

//   const navigate = useNavigate();
  //hadle esc keypress
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && visible) setIsVisible(false);
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [visible, setIsVisible]);

//   const url = baseUrl()
  const [otp, setOtp] = useState('');

  return (
    <div
      className={`flex flex-col justify-between relative rounded-[1rem] w-full bg-[#463a85] py-[1rem] px-[1rem] w-[23rem] sliding-component ${
        visible ? "slide-in" : "slide-out"
      } sm:w-[26rem] sm:py-[2.5rem] sm:px-[3rem]`}
      style={{ position: "absolute", left: 0, marginTop: "-3.5rem" }}
    >
      <h2 className="text-xl font-semibold">Enter OTP</h2>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        shouldAutoFocus
        containerStyle="flex gap-3"
        renderSeparator={<span className="w-2" />}
        renderInput={(props) => (
          <input
            {...props}
            className="w-12 h-12 text-center border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      />
      <button
        onClick={() => alert(`Entered OTP is ${otp}`)}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Verify
      </button>
    </div>
  );
};

export default OtpComponent;
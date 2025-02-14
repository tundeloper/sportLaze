import { useEffect, useState } from "react";

const GoogleLoginButton = () => {
  const [googleLoaded, setGoogleLoaded] = useState(false);

  useEffect(() => {
    // Load Google Identity Services SDK
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setGoogleLoaded(true);
      if ((window as any).google) {
        (window as any).google.accounts.id.initialize({
          client_id: "292887638276-kk8gmqfsjivcnjujhsiqiu5d62rkocqt.apps.googleusercontent.com", // 🔥 Replace with your actual Client ID
          callback: handleCredentialResponse,
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  // 🔹 Handle Login Response
  const handleCredentialResponse = (response: any) => {
    console.log("Google JWT Token:", response.credential);

    if (!response.credential) {
      console.error("No credential received!");
      return;
    }

    // 🔥 Send token to backend for verification
    fetch("https://lazeapi-2.onrender.com/google-signin/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.access_token) {
          console.log('logged in', data)
          // localStorage.setItem("access_token", data.access_token);
          alert("Login successful! Token stored.");
        } else {
          alert("Login failed: " + data.detail);
        }
      })
      .catch((err) => {
        console.error("Error during Google Sign-In:", err);
      });
  };

  // 🔹 Show Google Sign-In Prompt
  const loginHandler = () => {
    const google = (window as any).google;

    if (!googleLoaded || !google?.accounts?.id) {
      console.error("Google API not ready.");
      return;
    }

    google.accounts.id.prompt();
  };

  return (
    <div className="w-full flex justify-center">
      <div
        onClick={loginHandler}
        className="flex items-center justify-center gap-2 bg-white border border-gray-300 shadow-md px-5 py-3 rounded-full font-bold text-black hover:bg-gray-100 transition duration-300 w-full max-w-[400px] cursor-pointer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          alt="Google Logo"
          className="w-6 h-6"
        />
        <span className="font-bold">Sign up with Google</span>
      </div>
    </div>
  );
};

export default GoogleLoginButton;


// import { useEffect } from "react";

// const GoogleLoginButton  = () => {
//   useEffect(() => {
//     // Load Google Identity Services SDK
//     const script = document.createElement("script");
//     script.src = "https://accounts.google.com/gsi/client";
//     script.async = true;
//     script.defer = true;
//     document.body.appendChild(script);

//     // Define callback function globally
//     (window as any).handleCredentialResponse = (response: any) => {
//       console.log("Encoded JWT ID token:", response.credential);
//       if (!response.credential) {
//         console.error("No credential received!");
//         return;
//       }

//       fetch("https://lazeapi-2.onrender.com/google-signin/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ token: response.credential }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//           if (data.access_token) {
//             localStorage.setItem("access_token", data.access_token);
//             alert("Login successful! Token stored.");
//           } else {
//             alert("Login failed: " + data.detail);
//           }
//         })
//         .catch((err) => {
//           console.error("Error during Google Sign-In:", err);
//         });
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Google SSO Frontend</h1>
//       <div
//         id="g_id_onload"
//         data-client_id="292887638276-kk8gmqfsjivcnjujhsiqiu5d62rkocqt.apps.googleusercontent.com"
//         data-callback="handleCredentialResponse"
//         data-auto_prompt="false"
//       ></div>
//       <div className="g_id_signin" data-type="standard"></div>
//     </div>
//   );
// };

// export default GoogleLoginButton ;



// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import GoogleIcon from "../assets/svgs/googlesvg";
// import { useSportlaze } from "../hooks/useContext";
// import { useNavigate } from "react-router-dom";

// const GoogleLoginButton = () => {
//   const navigate = useNavigate()

//   const { login, setMessage, setLoading, setSnackIsOpen } = useSportlaze()

//   const loginHandler = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       console.log(tokenResponse.access_token)
//       try {
//         // console.log("Encoded JWT ID token:", tokenResponse.access_token);
//         const { data } = await axios.post("https://lazeapi-2.onrender.com/google-signin/", {
//           token: tokenResponse.access_token,
//         });
//         console.log(data, 'data')
//         if (data.access_token) {
//           console.log("LogedIn")
//           //   localStorage.setItem("access_token", data.access_token);
//           login(data.access_token)
//           navigate('/', { replace: true })

//         } else {
//           alert("Login failed: " + data.detail);
//         }
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//               console.log(error)
//               if (error.message === "Network Error") {
//                 setMessage({ message: error.message, error: true })
//               } else {
//                 setMessage({message: error.response?.data.detail, error: true })
//               }
//             }
//       } finally {
//         setLoading(false)
//         setSnackIsOpen(true)
//         // setMessage({ message: 'Invalid email or password', error: true })
//         setTimeout(() => {
//           setSnackIsOpen(false)
//         }, 5000)
//       }
//     },
//     onError: () => setMessage({ message: 'Invalid email or password', error: true }),
//     flow: "implicit",
//   });

//   return (
//     <button
//       onClick={() => loginHandler()}
//       className="flex items-center justify-center gap-2 bg-white border border-gray-300 shadow-md px-5 py-2 rounded-full font-bold text-black hover:bg-gray-100 transition duration-300"
//     >
//       <GoogleIcon />
//       <span className="font-bold">Sign up with Google</span>
//     </button>
//   );
// };

// export default GoogleLoginButton

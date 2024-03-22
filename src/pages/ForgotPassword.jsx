/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { Button, Input } from "../components/index";
// import authService from "../appwrite/auth";
// import { useForm } from "react-hook-form";

// function ForgotPassword() {
//   const { register, handleSubmit } = useForm();
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const forgotPassword = async (data) => {
//     setError("");
//     setMessage("");
//     try {
//       await authService.forgotPassword(data.email);
//       setMessage("Password reset email sent!");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="flex items-center w-full h-screen">
//       <div
//         className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
//       >
//         <h2 className="text-center text-2xl font-bold leading-tight">
//           Forgot Password
//         </h2>
//         {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
//         {message && (
//           <p className="text-green-600 mt-8 text-center">{message}</p>
//         )}
//         <form onSubmit={handleSubmit(forgotPassword)} className="mt-8">
//           <div className="space-y-5">
//             <Input
//               label="Email: "
//               placeholder="Enter your email"
//               type="email"
//               {...register("email", {
//                 required: true,
//                 validate: {
//                   matchPatern: (value) =>
//                     /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                     "Email address must be a valid address",
//                 },
//               })}
//             />
//             <Button type="submit" className="w-full ">
//               Send Reset Email
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ForgotPassword;


import React, { useState } from "react";
import conf from "../conf/conf";
import { Button, Input } from "../components/index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";


function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const forgotPassword = async (data) => {
    setError("");
    setMessage("");
    if (isVerified) {
      try {
        await authService.forgotPassword(data.email);
        setMessage("Password reset email sent!");
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Please verify you are a human!");
    }
  };

  const handleCaptchaResponseChange = (response) => {
    if (response) {
      setIsVerified(true);
    }
  };


  // const [recaptchaToken, setRecaptchaToken] = useState(null); // Add this line

  // const forgotPassword = async (data) => {
  //   setError("");
  //   setMessage("");
  //   if (isVerified) {
  //     try {
  //       await authService.forgotPassword(data.email, recaptchaToken); // Modify this line
  //       setMessage("Password reset email sent!");
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   } else {
  //     setError("Please verify you are a human!");
  //   }
  // };

  // const handleCaptchaResponseChange = (response) => {
  //   if (response) {
  //     setIsVerified(true);
  //     setRecaptchaToken(response); // Add this line
  //     console.log("reCAPTCHA token:", response); // Log the token to the console
  //   }
  // };

  return (
    <div className="flex items-center w-full h-screen">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <h2 className="text-center text-2xl font-bold leading-tight">
          Forgot Password
        </h2>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {message && (
          <p className="text-green-600 mt-8 text-center">{message}</p>
        )}
        <form onSubmit={handleSubmit(forgotPassword)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <ReCAPTCHA
              className="w-80 items-center mx-auto"
              sitekey={conf.recaptchaSiteKey}
              onChange={handleCaptchaResponseChange}
            />
            <Button type="submit" className="w-full ">
              Send Reset Email
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;

/* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { Button, Input } from "../components/index";
// import authService from "../appwrite/auth";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";


// function ResetPassword() {
//   const { search } = useLocation();
//   const params = new URLSearchParams(search);
//   const userId = params.get("userId");
//   const secret = params.get("secret");
//   // const { userId, secret } = useParams();
//   const { register, handleSubmit } = useForm();
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   // const resetPassword = async (data) => {
//   //   setError("");
//   //   setMessage("");
//   //   try {
//   //     await authService.updatePasswordRecovery(
//   //       userId,
//   //       secret,
//   //       data.newPassword,
//   //       data.confirmPassword
//   //     );
//   //     setMessage("Password reset successful!");
//   //     navigate("/login");
//   //   } catch (error) {
//   //     setError(error.message);
//   //   }
//   // };
  

//   const resetPassword = async (data) => {
    
//     setError("");
//     setMessage("");
//     if (!userId || !secret) {
//       setError("Missing user ID or secret.");
//       return;
//     }
    
//     const userIdRegex = /^[a-zA-Z0-9_]{1,36}$/;
//     if (!userIdRegex.test(userId)) {
//       setError("Invalid user ID.");
//       return;
//     }
//     try {
        
//       await authService.updatePasswordRecovery(
//         userId,
//         secret,
//         data.newPassword,
//         data.confirmPassword
//       );
//       // navigate("/login");
//       setMessage("Password reset successful!");
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
//           Reset Password
//         </h2>
//         {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
//         {message && (
//           <p className="text-green-600 mt-8 text-center">{message}</p>
//         )}
//         <form onSubmit={handleSubmit(resetPassword)} className="mt-8">
//           <div className="space-y-5">
//             <Input
//               label="New Password: "
//               placeholder="Enter your new password"
//               type="password"
//               {...register("newPassword", {
//                 required: true,
//               })}
//             />
//             <Input
//               label="Confirm New Password: "
//               placeholder="Confirm your new password"
//               type="password"
//               {...register("confirmPassword", {
//                 required: true,
//               })}
//             />
//             <Button type="submit" className="w-full ">
//               Reset Password
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;



import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Input } from "../components/index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userId = params.get("userId");
  const secret = params.get("secret");
  const { register, handleSubmit, watch } = useForm();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  const resetPassword = async (data) => {
    setError("");
    setMessage("");
    if (!userId || !secret) {
      setError("Missing user ID or secret.");
      return;
    }

    const userIdRegex = /^[a-zA-Z0-9_]{1,36}$/;
    if (!userIdRegex.test(userId)) {
      setError("Invalid user ID.");
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    try {
      await authService.updatePasswordRecovery(
        userId,
        secret,
        data.newPassword,
        data.confirmPassword
      );
      setMessage("Password reset successful!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center w-full h-screen">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <h2 className="text-center text-2xl font-bold leading-tight">
          Reset Password
        </h2>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {message && (
          <p className="text-green-600 mt-8 text-center">{message}</p>
        )}
        <form onSubmit={handleSubmit(resetPassword)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="New Password: "
              placeholder="Enter your new password"
              type="password"
              {...register("newPassword", { required: true })}
            />
            <Input
              label="Confirm New Password: "
              placeholder="Confirm your new password"
              type="password"
              {...register("confirmPassword", { required: true })}
            />
            <Button
              type="submit"
              className={`w-full ${
                newPassword === confirmPassword &&
                newPassword &&
                confirmPassword
                  ? "bg-blue-500"
                  : "bg-blue-300"
              }`}
            >
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;

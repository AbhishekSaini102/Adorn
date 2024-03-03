// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// export default function UserLoading({ children }) {
//   const userData = useSelector((state) => state.auth.userData);
//   const [userLoading, setUserLoading] = useState(!userData);

//   useEffect(() => {
//     if (userData) {
//       setUserLoading(false);
//     }
//   }, [userData]);

//   if (userLoading) {
//     return <div>Loading...</div>; 
//   }

//   return children;
// }

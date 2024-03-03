/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import {Header, Footer} from "./components";
import { Outlet } from "react-router-dom";

// function App() {
//   const [loading, setLoading] = useState(true); // Corrected here
//   const dispatch = useDispatch();

//   useEffect(() => {
//     authService
//       .getCurrentUser()
//       .then((userData) => {
//         if (userData) {
//           dispatch(login({ userData }));
//         } else {
//           dispatch(logout());
//         }
//       })
//       .catch((error) => {
//         console.log("App :: useEffect :: error", error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []); // Removed authService from dependency array

//   return !loading ? <div className="bg-red min-h-screen flex flex-wrap content-between bg-white">
//     <div className="w-full block">
//       <Header />
//       <main>
//        <Outlet className="h-screen" />
//       </main>
//       <Footer />

//     </div>
//   </div> : null; 
// }

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("App :: useEffect :: error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="flex flex-col min-h-screen bg-red bg-white">
      <Header />
      <main className="flex-grow" style={{ minHeight: "150vh" }}>
        {" "}
        {/* Increase the height here */}
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;


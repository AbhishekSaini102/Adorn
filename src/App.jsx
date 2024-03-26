/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import {Header, Footer} from "./components";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";

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
  const userData = useSelector((state) => state.auth.userData);

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
  }, [authService, dispatch]); //authService, dispatch added to dependency array

  return !loading ? (
    <div className="flex flex-col min-h-screen bg-red bg-white">
      {/* <Header /> */}
      <ScrollToTop />
      <header className="sticky top-0 z-50 bg-white">
        <Header />
      </header>
      {/* <main className="flex-grow" style={{ minHeight: "auto" }}> */}
      <main className="flex-grow" style={{ minHeight: "100vh" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;


/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import {Header, Footer} from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true); // Corrected here
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
  }, [dispatch]);

  return !loading ? <div className="bg-red min-h-screen flex flex-wrap content-between bg-red-500">
    <div className="w-full block">
      <Header />
      <main>
       Todo: <Outlet />
      </main>
      <Footer />

    </div>
  </div> : null; 
}

export default App;

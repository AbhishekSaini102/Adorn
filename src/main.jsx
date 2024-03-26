import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { AuthLayout, Login, ScrollToTop } from "./components/index.js";
// import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";

import AddPost from "./pages/AddPost";
import Signup from "./pages/Signup";
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";


import AllPosts from "./pages/AllPosts";
// import Testing from "./pages/Testing.jsx";
import Account from "./pages/Account.jsx";
import Html from "./pages/Html.jsx";
import TopicPosts from "./pages/TopicPosts.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import AEditor from "./pages/AEditor.jsx";
import CompileCodeEditor from "./pages/CompileCodeEditor.jsx";



// import UserLoading from "./components/UserLoading.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication={false}>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <AuthLayout authentication={false}>
            <ForgotPassword />
          </AuthLayout>
        ),
      },
      {
        path: "/reset-password/:userId/:secret",
        element: (
          <AuthLayout authentication={false}>
            <ResetPassword />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug/:post_Id",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug/:post_Id",
        element: <Post />,
      },

      {
        path: "/adorn-editor",
        element: (
          <AuthLayout authentication>
            {" "}
            <AEditor />
          </AuthLayout>
        ),
      },
      {
        path: "/adorn-editor/:post_Id",
        element: (
          <AuthLayout authentication>
            {" "}
            <CompileCodeEditor/>
          </AuthLayout>
        ),
      },
      {
        path: "/html",
        element: (
          <AuthLayout authentication>
            {" "}
            <Html />
          </AuthLayout>
        ),
      },

      {
        path: "/html/:slug/:post_Id",
        element: (
          <AuthLayout authentication>
            {" "}
            <TopicPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/account",
        element: (
          <AuthLayout authentication>
            {" "}
            <Account />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <Provider store={store}>
  //     <RouterProvider router={router} />
  //   </Provider>
  // </React.StrictMode>
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <ScrollToTop /> 
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

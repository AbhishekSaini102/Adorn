import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Link } from "react-router-dom";

function Home() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const Card = () => (
    <div className="w-full h-96 bg-white grid grid-cols-3 grid-rows-3 gap-4 p-5 rounded-sm shadow-md overflow-hidden grid-background border border-black">
      <div className="col-span-1 row-span-3">
        <img
          className="h-full w-full object-cover rounded-sm"
          src="https://tailwindcss.com/img/card-top.jpg"
          alt="Blog logo"
        />
      </div>
      <div className="col-span-2 row-span-3 p-4 bg-white rounded-sm border ">
        <div className="uppercase tracking-wide text-sm text-black font-semibold">
          Computer Language Blog
        </div>
        <a
          href="#"
          className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
        >
          Learn HTML
        </a>
        <p className="mt-2  text-black">
          HTML, or HyperText Markup Language, is the standard language for
          creating web pages. It uses tags and attributes to structure and
          format web content. With HTML, you can create headings, lists, images,
          links, and more, making your web page interactive and dynamic. It’s
          the foundation of any web page you see on the internet.
        </p>
        {/* <Button
          onClick={() => {
            navigate(authStatus ? `/html/${slug}` : "/login");
          }}
          bgColor="bg-blue-500"
          className="text-white hover:bg-blue-600 hover:text-blue-600  mt-2"
        >
          Learn HTML
        </Button>  */}

        <div className="mt-6">
          <Link
            to={authStatus ? "/html/html-element" : "/login"}
            className="btn btn-primary  text-white font-semibold rounded bg-blue-600 px-4 py-3 hover:bg-blue-600 hover:text-white"
          >
            Learn HTML
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen text-center">
      <div className=" w-full">
        <Card />
      </div>
    </div>
  );
}

export default Home;

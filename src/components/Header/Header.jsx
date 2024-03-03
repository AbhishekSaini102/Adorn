import React, { useState, useEffect, useRef } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../../appwrite/auth";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const [userData, setUserData] = useState(null);
  const [fetched, setFetched] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
      bgColor: "bg-white",
      textColor: "text-gray-700",
    },
    { name: "Testing", slug: "/testing", active: authStatus },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      bgColor: "bg-blue-600",
      textColor: "text-white",
      hoverTextColor: "text-blue-600",
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      bgColor: "bg-blue-600",
      textColor: "text-white",
      hoverTextColor: "text-blue-600",
    },
    {
      name: "AllPosts",
      slug: "/all-posts",
      active: authStatus,
      bgColor: "",
      textColor: "",
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      bgColor: "",
      textColor: "",
    },
  ];

  const getInitials = (name) => {
    let initials = name.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || "") + (initials.pop() || "")
    ).toUpperCase();
    return initials;
  };

  useEffect(() => {
    if (authStatus && !fetched) {
      authService.getCurrentUser().then((data) => {
        setUserData(data);
        setFetched(true);
      });
    } else if (!authStatus) {
      setUserData(null);
      setFetched(false);
    }
  }, [authStatus]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [authStatus, userData]);

  return (
    <header className="py-3 bg-white border-b border-t-black">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="mr-4">
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`inline-block px-6 py-2 duration-200 ${
                      item.bgColor || ""
                    } ${item.textColor || ""} ${
                      item.slug === currentPath
                        ? "bg-blue-100 text-gray-700"
                        : `hover:bg-blue-100 hover:text-gray-700`
                    } rounded-full`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && userData && (
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="inline-block px-6 py-1 duration-200 hover:bg-blue-100 rounded-full"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center mr-2">
                      {getInitials(userData.name)}
                    </div>
                    {userData.email}
                    <div className="ml-2">{dropdownOpen ? "▲" : "▼"}</div>
                  </div>
                </button>
                {dropdownOpen && (
                  <ul className="absolute right-0 ml-8 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                    <li>
                      <button
                        onClick={() => navigate("/account")}
                        className=" w-full font-semibold block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-500 hover:text-white"
                      >
                        Account
                      </button>
                    </li>
                    <li>
                      <LogoutBtn className=" " />
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );

}

export default Header;

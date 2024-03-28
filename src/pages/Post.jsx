/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth"; // Import authService
import AdornEditor from "../../src/components/AdornEditor";
import CopyTooltip from "../../src/components/CopyToolTip";
import { useLocation } from "react-router-dom";


export default function Post() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [isOpen, setIsOpen] = useState(false); // Added state for dropdown
  const [isEditing, setIsEditing] = useState(false); // Added state for editing
  const [isAuthor, setIsAuthor] = useState(false); // Initialize isAuthor state
  const [message, setMessage] = useState("Copy"); // Added message state
  
  // const passwordRef = useRef(null);

  const {slug, post_Id } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status); // Added this line

  // const copyPasswordToClipboard = useCallback(() => {
  //   if (passwordRef.current) {
  //     navigator.clipboard.writeText(passwordRef.current.value);
  //     passwordRef.current?.select();
  //     passwordRef.current?.setSelectionRange(0, 40); /*For mobile devices*/
  //     passwordRef.current?.focus();
  //     setMessage("Copied");

  //     // Clear the message after 2 seconds
  //     setTimeout(() => {
  //       setMessage("Copy");
  //     }, 2000);
  //   }
  // }, [setMessage, passwordRef]);


  useEffect(() => {
    setIsLoading(true); // Set loading to true initially
    if (post_Id && slug) {
      appwriteService
        .getPost(post_Id, slug)
        .then((post) => {
          if (post) {
            setPost(post);
            authService
              .getCurrentUser()
              .then((currentUser) => {
                if (currentUser && post && currentUser.$id === post.userId) {
                  setIsAuthor(true);
                  setIsEditing(true);
                }
              })
              .catch((error) => {
                console.log("Post :: useEffect :: error", error);
              });
          } else {
            navigate("/");
          }
        })
        .finally(() => setIsLoading(false)); // Set loading to false after request
    } else {
      navigate("/");
    }
  }, [post_Id, slug, navigate]); // Removed isAuthor from dependency array

  useEffect(() => {
    if (!authStatus) {
      navigate("/");
    }
  }, [authStatus, navigate]); // Listen to changes in authStatus

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };


  const copyPasswordToClipboard = useCallback(() => {
    if (post) {
      navigator.clipboard.writeText(post.code);
      setMessage("Copied");

      // Clear the message after 2 seconds
      setTimeout(() => {
        setMessage("Copy");
      }, 2000);
    }
  }, [setMessage, post]);

  // const runCode = () => {
  //   // Add your code here to run the code or navigate to a specific route
  //   navigate("/adorn-editor");
  // };

 

  // const runCode = () => {
    
  //     const codeToRun = post.code;
  //     navigate("/adorn-editor", { state: { code: post.code } });
    
  // };
  const runCode = () => {
    if (post) {
      navigate(`/adorn-editor/${post.post_Id}`, { state: { code: post.code } });
    } else {
      console.log("Post is null");
    }
  };




  const toggleDropdown = () => setIsOpen(!isOpen); // Function to toggle dropdown

  return isLoading ? (
    <div className="animate-custom-pulse py-10">
      {/* Image Section */}

      <div className="flex justify-center items-center w-full">
        <div className="h-48 w-full items-center bg-gray-400 z-10 flex justify-center mb-4 relative border rounded-lg p-2 mx-28 my-1"></div>
      </div>

      {/* Editor Section */}
      <div className="flex justify-center items-center  w-full">
        <div className="h-16 w-full items-center bg-gray-400 z-10 flex justify-center mb-4 relative border rounded-lg p-2 mx-28 my-1"></div>
      </div>
      {/* Content Section */}
      <div className="flex w-full">
        <div className="h-10 w-48 items-center bg-gray-400 z-10 flex justify-center relative border rounded-lg p-2 mx-28 my-1"></div>
      </div>
      {/* Post Details */}
      <div className="flex  w-full">
        <div className="h-8 w-72 items-center bg-gray-400 z-10 flex justify-center relative border rounded-lg p-2 mx-28 my-1"></div>
      </div>
      <div className="flex  w-full">
        <div className="h-3 w-full items-center bg-gray-400 z-10 flex justify-center relative border rounded-lg p-2 mx-28 my-1"></div>
      </div>
      <div className="flex  w-full">
        <div className="h-3 w-full items-center bg-gray-400 z-10 flex justify-center relative border rounded-lg p-2 mx-28 my-1"></div>
      </div>
      <div className="flex  w-full">
        <div className="h-3 w-full items-center bg-gray-400 z-10 flex justify-center relative border rounded-lg p-2 mx-28 my-1"></div>
      </div>
    </div>
  ) : (
    post && ( // Added authStatus here
      <div className="py-10">
        <Container>
          <div className=" z-10 flex justify-center mb-4 relative border rounded-xl p-2">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl"
            />

            {authStatus && isEditing && (
              <div className="absolute right-6 top-6 bg-white rounded-lg px-2 py-2">
                <button onClick={toggleDropdown}>Menu</button>
                {isOpen && (
                  <div className="dropdown">
                    <Link to={`/edit-post/${post.slug}/${post.$id}`}>
                      <Button bgColor="bg-green-500" className="mr-3">
                        Edit
                      </Button>
                    </Link>
                    <Button bgColor="bg-red-500" onClick={deletePost}>
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
            {/* <p className="text-xl font-bold">{post.code}</p> */}
            {/* <AdornEditor
              className="rounded-lg"
              language="cpp"
              theme="vs-dark"
              value={post.code}
              readOnly={!isAuthor}
              onChange={() => {}}
            /> */}

            <div className=" items-center px-4 py-4 bg-black/90  rounded-xl">
              <button
                onClick={copyPasswordToClipboard}
                className="relative group inline-block rounded-lg outline-none bg-white z-20 text-black px-2.5 py-1 shrink-0 float-right hover:bg-white/90 active:bg-white-80 focus:outline-none mb-2 font-semibold mr-2"
              >
                Copy
                <CopyTooltip message={message} />
              </button>
              <AdornEditor
                // className="rounded-xl"
                language="cpp"
                theme="vs-dark"
                value={post.code}
                readOnly={!isAuthor}
                onChange={() => {}}
              />
            </div>
            {/* <button
              // navigate={`/adorn-editor`}
              onClick={runCode}
              className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Run this code
            </button> */}

            {/* {post && ( */}
            <Link
              to={{
                // pathname: `/adorn-editor/${post.post_Id}`,
                // state: { code: post.code },
              }}
              onClick={runCode}
              className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-block"
            >
              Run this code
            </Link>
            {/* )}  */}

            <p>Author: {post.authorName}</p>
            <p>Email: {post.authorEmail}</p>
          </div>
          <div className="browser-css">{parse(post.content)}</div>
        </Container>
      </div>
    )
  );
}

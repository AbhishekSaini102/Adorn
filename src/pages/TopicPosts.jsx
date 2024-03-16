// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import appwriteService from "../appwrite/config";
// import { Button, Container } from "../components";
// import parse from "html-react-parser";
// import { useSelector } from "react-redux";
// import authService from "../appwrite/auth"; // Import authService

// export default function TopicPosts() {
//   const [post, setPost] = useState(null);
//   const [isLoading, setIsLoading] = useState(true); // Added loading state
//   const [isOpen, setIsOpen] = useState(false); // Added state for dropdown
//   const [isEditing, setIsEditing] = useState(false); // Added state for editing
//   const [isAuthor, setIsAuthor] = useState(false); // Initialize isAuthor state

//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const userData = useSelector((state) => state.auth.userData);
//   const authStatus = useSelector((state) => state.auth.status); // Added this line

//   useEffect(() => {
//     setIsLoading(true); // Set loading to true initially
//     if (slug) {
//       appwriteService
//         .getPost(slug)
//         .then((post) => {
//           if (post) {
//             setPost(post);
//             authService
//               .getCurrentUser()
//               .then((currentUser) => {
//                 if (currentUser && post && currentUser.$id === post.userId) {
//                   setIsAuthor(true);
//                   setIsEditing(true);
//                 }
//               })
//               .catch((error) => {
//                 console.log("Post :: useEffect :: error", error);
//               });
//           } else {
//             navigate(`/html/${post.slug}`);
//           }
//         })
//         .finally(() => setIsLoading(false)); // Set loading to false after request
//     } else {
//       navigate(`/html/${post.slug}`);
//     }
//   }, [slug, navigate]); // Removed isAuthor from dependency array

//   useEffect(() => {
//     if (!authStatus) {
//       navigate(`/html/${post.slug}`);
//     }
//   }, [authStatus, navigate]); // Listen to changes in authStatus

//   const deletePost = () => {
//     appwriteService.deletePost(post.$id).then((status) => {
//       if (status) {
//         appwriteService.deleteFile(post.featuredImage);
//         navigate(`/post/${post.slug}`);
//       }
//     });
//   };

//   const toggleDropdown = () => setIsOpen(!isOpen); // Function to toggle dropdown

//   return isLoading ? (
//     <div className="text-center">Loading...</div>
//   ) : (
//     post && ( // Added authStatus here
//       <div className="py-10">
//         <Container>
//           <div className="w-full z-10 flex justify-center mb-4 relative border rounded-xl p-2">
//             <img
//               src={appwriteService.getFilePreview(post.featuredImage)}
//               alt={post.title}
//               className="rounded-xl"
//             />

//             {authStatus && isEditing && (
//               <div className="absolute right-6 top-6 bg-white rounded-lg px-2 py-2">
//                 <button onClick={toggleDropdown}>Menu</button>
//                 {isOpen && (
//                   <div className="dropdown">
//                     <Link to={`/edit-post/${post.$id}`}>
//                       <Button bgColor="bg-green-500" className="mr-3">
//                         Edit
//                       </Button>
//                     </Link>
//                     <Button bgColor="bg-red-500" onClick={deletePost}>
//                       Delete
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//           <div className="w-full mb-6">
//             <h1 className="text-2xl font-bold">{post.title}</h1>
//             <p>Author: {post.authorName}</p>
//             <p>Email: {post.authorEmail}</p>
//           </div>
//           <div className="browser-css">{parse(post.content)}</div>
//         </Container>
//       </div>
//     )
//   );
// }


import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth"; // Import authService

export default function TopicPosts() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [isOpen, setIsOpen] = useState(false); // Added state for dropdown
  const [isEditing, setIsEditing] = useState(false); // Added state for editing
  const [isAuthor, setIsAuthor] = useState(false); // Initialize isAuthor state

  const { slug, languages } = useParams(); // Extract both slug and topic from the URL parameters
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status); // Added this line

  useEffect(() => {
    setIsLoading(true); // Set loading to true initially
    if (slug && languages) {
      appwriteService
        .getPost(slug, languages) // Pass both slug and languages to getPost
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
  }, [slug, languages, navigate]); // Add topic to the dependency array

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

  const toggleDropdown = () => setIsOpen(!isOpen); // Function to toggle dropdown

  return isLoading ? (
    <div className="text-center">Loading...</div>
  ) : (
    post && ( // Added authStatus here
      <div className="py-10">
        <Container>
          <div className="w-full z-10 flex justify-center mb-4 relative border rounded-xl p-2">
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
                    <Link to={`/edit-post/${post.$id}`}>
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
            <p>Author: {post.authorName}</p>
            <p>Email: {post.authorEmail}</p>
          </div>
          <div className="browser-css">{parse(post.content)}</div>
        </Container>
      </div>
    )
  );
}


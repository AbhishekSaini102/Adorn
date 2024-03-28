/* eslint-disable no-unused-vars */

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { PostCard, Container } from "../components";
// import appwriteService from "../appwrite/config";

// function Html() {
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [activeSlug, setActiveSlug] = useState("html-element"); // Set the first slug as the active slug
//   const slugs = [
//     "html-element",
//     "element",
//     "html-elements",
//     "elements",
//     "html-elementss",
//     "elementss",
//   ]; // Update slugs

//   const handleSlugClick = (slug, event) => {
//     event.preventDefault(); // Prevent navigation
//     setActiveSlug(slug); // Set the clicked slug as the active slug
//   };

//   // Fetch posts whenever the active slug changes
//   useEffect(() => {
//     const fetchPosts = async () => {
//       const response = await appwriteService.getPostBySlug(activeSlug); // Fetch post by slug
//       if (response.documents.length > 0) {
//         setSelectedPost(response.documents); // Set the fetched post as the selected post
//       } else {
//         console.log(`No posts found for slug: ${activeSlug}`);
//         setSelectedPost(null);
//       }
//     };

//     fetchPosts();
//   }, [activeSlug]);

//   return (
//     <div className="flex">
//       <div className="w-1/6 bg-white text-black shadow-xl h-screen fixed top-16 overflow-y-scroll">
//         <h2
//           className="text-xl w-58 font-bold py-0.5 text-blue-600 sticky top-0 bg-white px-6 block border-b-2 
//         border-gray-200"
//         >
//           HTML
//         </h2>
//         {slugs.map((slug, index) => (
//           <Link
//             key={index}
//             to={`/posts/${slug}`}
//             className={`w-58 text-gray-800 block border-b-2 
//           border-gray-200 py-0.5 pl-6 ${
//             slug === activeSlug
//               ? "bg-blue-600 text-white"
//               : "hover:bg-blue-600 hover:text-white"
//           }`}
//             onClick={(event) => handleSlugClick(slug, event)} // Pass event to handler
//           >
//             {slug}
//           </Link>
//         ))}
//         <div className="w-58 h-28  bg-gray-200 mt-0.5 ">
//           <p className=" ml-2 px-4 py-2 text-lg text-black">The End</p>
//         </div>
//       </div>
//       <div className="w-full py-8 ml-64">
//         <Container>
//           <div className="flex flex-wrap justify-center items-center h-full">
//             {selectedPost ? (
//               selectedPost.map((post, index) => (
//                 <div key={index} className="p-2 w-1/4">
//                   <PostCard {...post} />
//                 </div>
//               ))
//             ) : (
//               <div className="flex flex-col items-center justify-center h-full">
//                 <p>No posts found for this slug.</p>
//                 <Link to="/add-post" className="btn btn-primary mt-4">
//                   Add Post
//                 </Link>
//               </div>
//             )}
//           </div>
//         </Container>
//       </div>
//     </div>
//   );
// }

// export default Html;



// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { PostCard, Container } from "../components";
// import appwriteService from "../appwrite/config";

// function Html() {
//   // const [selectedPost, setSelectedPost] = useState(null);
//   // const [activeSlug, setActiveSlug] = useState("html-element"); // Set the first slug as the active slug
//   // const slugs = [
//   //   "html-element",
//   //   "element",
//   //   "html-elements",
//   //   "elements",
//   //   "html-elementa",
//   //   "elementa",
//   // ]; // Update slugs
//   // const navigate = useNavigate(); // Get the useNavigate hook

//   // const handleSlugClick = (slug, event) => {
//   //   event.preventDefault(); // Prevent navigation
//   //   setActiveSlug(slug); // Set the clicked slug as the active slug
//   //   navigate(`/html/${slug}`); // Navigate to the new URL
//   // };

//   // // Fetch posts whenever the active slug changes
//   // useEffect(() => {
//   //   const fetchPosts = async () => {
//   //     const response = await appwriteService.getPostBySlug(activeSlug); // Fetch post by slug
//   //     if (response.documents.length > 0) {
//   //       setSelectedPost(response.documents); // Set the fetched post as the selected post
//   //     } else {
//   //       console.log(`No posts found for slug: ${activeSlug}`);
//   //       setSelectedPost(null);
//   //     }
//   //   };

//   //   fetchPosts();
//   // }, [activeSlug]);

//   const navigate = useNavigate();
//   const { slug: urlSlug } = useParams(); // Get the current slug from the URL
//   const slugs = [
//     "html-element",
//     "element",
//     "html-elements",
//     "elements",
//     "html-elementa",
//     "elementa",
//   ];

//   // Set the active slug to the current slug from the URL if it exists, else set to default
//   const [activeSlug, setActiveSlug] = useState(urlSlug || "html-element");
//   const [selectedPost, setSelectedPost] = useState(null);

//   const handleSlugClick = (slug, event) => {
//     event.preventDefault();
//     setActiveSlug(slug);
//     navigate(`/html/${slug}`);
//   };

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const response = await appwriteService.getPostBySlug(activeSlug);
//       if (response.documents.length > 0) {
//         setSelectedPost(response.documents);
//       } else {
//         console.log(`No posts found for slug: ${activeSlug}`);
//         setSelectedPost(null);
//       }
//     };

//     fetchPosts();
//   }, [activeSlug]);

//   return (
//     <div className="flex">
//       <div className="w-1/6 bg-white text-black shadow-xl h-screen fixed top-16 overflow-y-scroll">
//         <h2
//           className="text-xl w-58 font-bold py-0.5 text-blue-600 sticky top-0 bg-white px-6 block border-b-2 
//         border-gray-200"
//         >
//           HTML
//         </h2>
//         {slugs.map((slug, index) => (
//           <Link
//             key={index}
//             to={`/html/${slug}`}
//             className={`w-58 text-gray-800 block border-b-2 
//           border-gray-200 py-0.5 pl-6 ${
//             slug === activeSlug
//               ? "bg-blue-600 text-white"
//               : "hover:bg-blue-600 hover:text-white"
//           }`}
//             onClick={(event) => handleSlugClick(slug, event)} // Pass event to handler
//           >
//             {slug}
//           </Link>
//         ))}
//         <div className="w-58 h-28  bg-gray-200 mt-0.5 ">
//           <p className=" ml-2 px-4 py-2 text-lg text-black">The End</p>
//         </div>
//       </div>
//       <div className="w-full py-8 ml-64">
//         <Container>
//           <div className="flex flex-wrap justify-center items-center h-full">
//             {selectedPost ? (
//               selectedPost.map((post, index) => (
//                 <div key={index} className="p-2 w-1/4">
//                   <PostCard {...post} />
//                 </div>
//               ))
//             ) : (
//               <div className="flex flex-col items-center justify-center place-content-center h-full mt-48">
//                 <p className="text-lg">No posts found for this slug.</p>
//                 <Link to="/add-post" className="btn btn-primary mt-4">
//                   <div className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded shadow-md text-white">Add Post</div>
//                 </Link>
//               </div>
//             )}
//           </div>
//         </Container>
//       </div>
//     </div>
//   );
// }

// export default Html;


import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostCard, Container } from "../components";
import appwriteService from "../appwrite/config";

function Html() {
  const navigate = useNavigate();
  const { slug: urlSlug } = useParams(); // Get the current slug from the URL
  const slugs = [
    "html-element",
    "element",
    "html-elements",
    "elements",
    "html-elementa",
    "elementa",
  ];

  // Set the active slug to the current slug from the URL if it exists, else set to default
  const [activeSlug, setActiveSlug] = useState(urlSlug || "html-element");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  const handleSlugClick = (slug, event) => {
    event.preventDefault();
    setActiveSlug(slug);
    navigate(`/html/${slug}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true); // Set loading state to true when fetching starts
      const response = await appwriteService.getPostBySlug(activeSlug);
      if (response.documents.length > 0) {
        setSelectedPost(response.documents);
      } else {
        console.log(`No posts found for slug: ${activeSlug}`);
        setSelectedPost(null);
      }
      setIsLoading(false); // Set loading state to false when fetching ends
    };

    fetchPosts();
  }, [activeSlug]);

  return (
    <div className="flex">
      <div className="w-1/6 bg-white text-black shadow-xl h-screen fixed top-16 overflow-y-scroll">
        <h2
          className="text-xl w-58 font-bold py-0.5 text-blue-600 sticky top-0 bg-white px-6 block border-b-2 
        border-gray-200"
        >
          HTML
        </h2>
        {slugs.map((slug, index) => (
          <Link
            key={index}
            to={`/html/${slug}`}
            className={`w-58 text-gray-800 block border-b-2 
          border-gray-200 py-0.5 pl-6 ${
            slug === activeSlug
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-600 hover:text-white"
          }`}
            onClick={(event) => handleSlugClick(slug, event)} // Pass event to handler
          >
            {slug}
          </Link>
        ))}
        <div className="w-58 h-28  bg-gray-200 mt-0.5 ">
          <p className=" ml-2 px-4 py-2 text-lg text-black">The End</p>
        </div>
      </div>
      <div className="w-full py-8 ml-64">
        <Container>
          <div className="flex flex-wrap justify-center items-center h-full">
            {isLoading ? (
              <div className="bg-blue-600 px-4 py-1 text-white rounded-sm ">Loading...</div> // Show loading message when isLoading is true
            ) : selectedPost ? (
              selectedPost.map((post, index) => (
                <div key={index} className="p-2 w-1/4">
                  <PostCard {...post} />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center place-content-center h-full mt-48">
                <p className="text-lg">No posts found for this slug.</p>
                <Link to="/add-post" className="btn btn-primary mt-4">
                  <div className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded shadow-md text-white">
                    Add Post
                  </div>
                </Link>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Html;

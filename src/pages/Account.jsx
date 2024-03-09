/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth";

function Account() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const authStatus = useSelector((state) => state.auth.status);
  // const navigate = useNavigate();

  

  useEffect(() => {
    setIsLoading(true); // Set loading to true when fetching data
    if (authStatus) {
      authService.getCurrentUser().then((userData) => {
        setUser(userData);
        appwriteService
          .getUserPosts(userData.$id)
          .then((posts) => {
            // Fetch only the posts of the current user
            if (posts) {
              setPosts(posts.documents);
            } 
          })
          .catch((error) => {
            console.error(
              `An error occurred while getting user posts: ${error}`
            );
          })
          .finally(() => {
            setIsLoading(false); // Set loading to false after data is fetched or if an error occurs
          });
      });
    }
  }, [authStatus]);


  const deletePost = (postId, imageId) => {
    appwriteService.deletePost(postId).then((status) => {
      if (status) {
        appwriteService.deleteFile(imageId);
        setPosts(posts.filter((post) => post.$id !== postId));
      }
    });
  };

  if (isLoading) { // Render a loading message while fetching data
    return <div>Loading...</div>;
  }

  return authStatus ? (
    <div className="w-full py-8 ">
      <Container>
        <div className="profile-info text-center border-b-2 border-gray-200 pb-8 mb-8">
          <div className="bg-blue-500 text-white font-bold text-2xl rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
            {user && user.name
              ? user.name
                  .split(" ")
                  .map((n) => n[0].toUpperCase())
                  .join("")
              : ""}
          </div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <div className="user-posts flex flex-wrap justify-between">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/4">
                <Link to={`/post/${post.$id}`}>
                  <div className="w-full bg-gray-100 rounded-xl p-4 ">
                    <div className="w-full h-40 bg-gray-200 rounded-lg mb-4">
                      <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <h2 className="text-xl font-bold">{post.title}</h2>
                  </div>
                </Link>
                <div className="flex justify-between mt-2">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button bgColor="bg-green-500" className="mr-3">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    bgColor="bg-red-500"
                    onClick={() => deletePost(post.$id, post.featuredImage)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center py-4">
              <p className="text-xl text-gray-700">
                You do not have any posts yet.
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null;


}

export default Account;

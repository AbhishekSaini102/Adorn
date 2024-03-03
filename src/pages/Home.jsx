/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Button, Container, PostCard } from "../components";
// import AllPosts from "./AllPosts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (!authStatus) {
    return (
      <div className="w-full h-screen py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>

          <div>
            <Container>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                bgColor="bg-blue-500"
                className="text-white hover:bg-blue-600 hover:text-blue-600  mt-2"
              >
                Login
              </Button>
            </Container>
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="w-full py-8 h-screen">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;

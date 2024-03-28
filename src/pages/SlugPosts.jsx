/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";

function SlugPosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { slug } = useParams(); // Get the slug from the URL

  useEffect(() => {
    appwriteService.getPostBySlug(slug).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        setIsLoading(false); // Set loading to false after data is fetched
      }
    });
  }, [slug]); // Dependency array includes slug to refetch when it changes

  return isLoading ? (
    <div>
      <Loading />
    </div>
  ) : (
    <div className="w-full py-8">
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

export default SlugPosts;

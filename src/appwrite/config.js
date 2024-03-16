/* eslint-disable no-unused-vars */
import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";
import { v4 as uuidv4 } from "uuid";




export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
    authorName,
    authorEmail,
    languages,
    topics,
  }) {
    try {
      let post_Id = uuidv4();

      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        post_Id,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
          authorName,
          authorEmail,
          languages,
          topics,
          post_Id,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }
  async updatePost(
    post_Id,
    {
      title,
      slug,
      content,
      featuredImage,
      status,
      authorName,
      authorEmail,
      languages,
      topics,
    }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        post_Id,
        {
          title,
          slug,
          languages,
          content,
          featuredImage,
          status,
          authorName,
          authorEmail,
          topics,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(post_Id) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        post_Id
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(post_Id) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        post_Id

      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }
  async getPostsByTopic(topic) {
    try {
      let queries = [
        Query.equal("status", "active"),
        Query.equal("topic", topic),
      ];
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }
  async getUserPosts(userId) {
    try {
      let queries = [
        Query.equal("status", "active"),
        Query.equal("userId", userId),
      ];
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  // file upload service

  // async uploadFile(file) {
  //   try {
  //     return this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
  //   } catch (error) {
  //     console.log("Appwrite service :: uploadFile :: error", error);
  //     return false;
  //   }
  // }

  async uploadFile(file, postId) {
    try {
      // Check if postId is defined and is a string. If not, generate a new UUID.
      postId = postId && typeof postId === "string" ? postId : uuidv4();
      return this.bucket.createFile(conf.appwriteBucketId, postId, file);
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;

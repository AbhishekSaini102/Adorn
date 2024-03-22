/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import conf from "../conf/conf.js";
import { Client, Account, ID, Databases} from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    // .setKey(conf.appwriteAPIKey);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(email) {
    try {
      return await this.account.createRecovery(
        email,
        "http://localhost:5173/reset-password/{userId}/{secret}"
      );
    } catch (error) {
      console.log("Appwrite service :: forgotPassword :: error", error);
    }
  }

  async updatePasswordRecovery(userId, secret, newPassword, confirmPassword) {
    try {
      return await this.account.updateRecovery(
        userId,
        secret,
        newPassword,
        confirmPassword
      );
    } catch (error) {
      console.log("Appwrite service :: updatePasswordRecovery :: error", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;

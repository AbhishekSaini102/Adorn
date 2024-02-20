/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import conf from '../conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId);
            // .setKey(conf.appwrite.key);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) { 
                //call another method to create a user profile
                // return userAccount;
                return this.login({email, password})
                
            }
            else{
                return userAccount;
            }
        } catch(error) {
            throw error;    
        }
        
    }
    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);   
        } catch(error) {
            throw error;    
        }
    }
    async logout(){
        try {
            return await this.account.deleteSessions();   
        } catch(error) {
            console.log("Appwrite service :: logout :: error", error);    
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get();   
        } catch(error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);   
        }
        return null;
    }
}

const authService = new authService();

export default authService;

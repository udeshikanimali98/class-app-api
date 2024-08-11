//import { AppLogger } from "../common/logging";
import { ApplicationError } from "../common/application-error";
import { DUser, IUser, Role, UserDetails } from "../models/user-model";
import User from "../schemas/user-schema";
import { StringOrObjectId } from "../common/util";


export namespace UserDao {
  export async function getUserByEmail(email: string): Promise<IUser | null> {
    let user = await User.findOne({ email: email });
   // AppLogger.info(`Got user for email, userID: ${user ? user._id : "None"}`);
    return user;
  }

  export async function createCustomer(
    data: DUser & Partial<DUser>
  ): Promise<IUser> {
    const iCustomer = new User(data);
    console.log(data);
    const customer = await iCustomer.save();
    return customer; 
  }
  
  
  export async function authenticateUser(
    email: string,
    password: string
  ): Promise<any> {
    let user = await User.findOne({ email: email });
    
    if (user) {
      const isMatch = await user.comparePassword(password);
      if (isMatch) {
        const tokenString = await user.createAccessToken();  
        return {
          token: tokenString,
          role: user.role,
        };
      } else {
        console.log("Incorrect email/password combination!");
        return false;
      }
    } else {
      throw new ApplicationError("User not found in the system!");
    }
  }

  export async function updateUser(
    userId: string,
    data: Partial<any>
  ): Promise<any | null> {
    try {
      const result = await User.findOneAndUpdate(
        { _id: userId },
        { $set: data },
        { new: true }
      );

      if (result) {
        
        return result;
      } else {
        throw new Error(`Customer with ID ${userId} not found.`);
      }
    } catch (error: any) {
    
      throw error;
    }
  }

}

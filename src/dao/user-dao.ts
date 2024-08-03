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
    return customer; // Return the whole user document
    //return customer._id.toString();
  }
  
  
  // export async function authenticateUser(
  //   email: string,
  //   password: string
  // ): Promise<any> {
  //   let user = await User.findOne({ email: email });
  //   if (
  //     user != null &&
  //     user.verificationStatus == UserVerificationStatus.BLOCKED
  //   ) {
  //     throw new ApplicationError("User Account Is Blocked!");
  //   }
  //   if (user) {
  //     const isMatch = await user.comparePassword(password);
  //     if (isMatch) {
  //       const tokenString = await user.createAccessToken();
  //       let logedUser: IBusinessUser | IIndividualUser = {} as
  //         | IBusinessUser
  //         | IIndividualUser;
  //       if (user.role === Role.INDIVIDUAL) {
  //         logedUser = await IndividualUserDao.getCurrentUserById(user._id);
  //       } else if (user.role === Role.BUSINESS) {
  //         logedUser = await BusinessUserDao.getCurrentUserById(user._id);
  //       }
  //       return {
  //         token: tokenString,
  //         role: user.role,
  //         logedUser: logedUser,
  //       };
  //     } else {
  //       console.log("Incorrect email/password combination!");
  //       return false;
  //     }
  //   } else {
  //     throw new ApplicationError("User not found in the system!");
  //   }
  // }

}

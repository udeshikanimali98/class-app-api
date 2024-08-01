// import { NextFunction, Request, Response } from "express";
// import User = Express.User;
// import { Types } from "mongoose";
// import { UserDao } from "../dao/user-dao";
// import { SubscriptionStatus } from "../models/user-model";
// import { Util } from "../common/util";
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// export function verifyActiveSubscription() {
//     return async function (req: Request, res: Response, next: NextFunction) {

//         if (!req.user) {
//           Util.sendError(res, "User not found!"); // Handle case where user is undefined
//           }
//          else {
//         const status = await checkValidSubscription(req.user);
  
//         if (status) {
//           next();
//         } else {
//           Util.sendError(res, "No active subscription found!");
//         }
//       }
//     };
//   }

//   export async function checkValidSubscription(user: User): Promise<boolean> {
//     const currentUser = await UserDao.getUserById(user._id);

//     if (!currentUser.user.subscriptionId) {
//       return false;
//     }
//     if (!currentUser.user.subcriptionStatus) {

//       return false;
//     }
//     try {

//       const subscription = await stripe.subscriptions.retrieve(currentUser.user.subscriptionId);
 
//       if (subscription.status != currentUser.user.subcriptionStatus) {
//         await UserDao.updateUserSubscriptionStatus(currentUser.user._id, { subcriptionStatus: subscription.status });
//       }

//       if (subscription.status == SubscriptionStatus.ACTIVE || subscription.status == SubscriptionStatus.TRIALING) {
//         return true;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       // Handle errors, for example:
//       if (error instanceof stripe.errors.StripeInvalidRequestError) {

//         console.log(error);
        
//       } else {
//         // Handle other errors
//       }
//       return false;
//     }
  

//   }
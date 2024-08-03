import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Util } from "../common/util";
import { UserDao } from "../dao/user-dao";
import {
  Validation,
  passwordValidation,
} from "../common/validation";
import { DUser, IUser, Medium, Role } from "../models/user-model";


import { EmailService } from "../services/mail";

export namespace UserEp {
  export function authValidationRules() {
    return [Validation.email(), Validation.password()];
  }

  export async function authenticatewithEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return Util.sendError(res, errors.array()[0]["msg"]);
    }

    // UserDao.authenticateUser(req.body.email, req.body.password)
    //   .then((token: string) => {
    //     Util.sendSuccess(res, token, "User logged succefully");
    //   })
    //   .catch(next);
  }

  export async function register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return Util.sendError(res, errors.array()[0]["msg"]);
      }

      const existingUser = await UserDao.getUserByEmail(req.body.email);

      if (existingUser !== null) {
        return Util.sendError(res, "Email already exists!");
      }

      const password = req.body.password;

      // Password requirements: at least 8 characters, one special character, one capital letter
      const isPasswordValid = passwordValidation(password);
      if (!isPasswordValid) {
        return Util.sendError(
          res,
          "Password must be at least 8 characters long and contain at least one special character and one uppercase letter"
        );
      }

      if (password !== req.body.confirmPassword) {
        return Util.sendError(
          res,
          "Password and confirmed password do not match"
        );
      }

      const data: DUser = {
       
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        name: req.body.name,
        password: password,
       
         role: Role.CHILD,
      };

      const token = await UserDao.createCustomer(data);

      await EmailService.sendWelcomeEmail(req.body.email,
            "Welcome to ClassQ",
            "Welcome to ClassQ",
            `Thank you for registering with us.`);

      Util.sendSuccess(res, token, "User registered");
    } catch (error) {
      console.error("Error in CustomerEp.register:", error);
      Util.sendError(res, "An internal server error occurred", 500);
    }
  }

  // export function getSelf(req: Request, res: Response, next: NextFunction) {
  //   UserDao.getUserById(req.user!._id)
  //     .then((user) => {
  //       const url = process.env.AWS_REGION_ENDPOINT || ''
  //       if(user.user.profileImage){
  //         user.user.profileImage = url + user.user.profileImage;
  //       }
  //       if(user.user.aboutSelfVideo){
  //         user.user.aboutSelfVideo = url + user.user.aboutSelfVideo;
  //       }
  //       if(user.user.photos){
  //         user.user.photos = user.user.photos.map(photo => url + photo);
  //       }
  //       Util.sendSuccess(res, user, "User found");
  //     })
  //     .catch(next);
  // }



  //Get user by ID for friend
  // export function getUser(req: Request, res: Response, next: NextFunction) {
  //   // const id = req.params.id;
  //   UserDao.getFriend(req.params.id)
  //     .then((user) => {
  //       const url = process.env.AWS_REGION_ENDPOINT || ''
  //       if(user.user.profileImage){
  //         user.user.profileImage = url + user.user.profileImage;
  //       }
  //       if(user.user.aboutSelfVideo){
  //         user.user.aboutSelfVideo = url + user.user.aboutSelfVideo;
  //       }
  //       if(user.user.photos){
  //         user.user.photos = user.user.photos.map(photo => url + photo);
  //       }
  //       Util.sendSuccess(res, user, "User found");
  //     })
  //     .catch(next);
  // }


  

 

  

 
  }

  


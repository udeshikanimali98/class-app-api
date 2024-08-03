import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Util } from "../common/util";
import { UserDao } from "../dao/user-dao";
import {
  isEmailValid,
  Validation,
  passwordValidation,
} from "../common/validation";
import { DUser} from "../models/user-model";


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

    UserDao.authenticateUser(req.body.email, req.body.password)
      .then((token: string) => {
        Util.sendSuccess(res, token, "User logged succefully");
      })
      .catch(next);
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

  export async function login(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;
     
      const isEmail = isEmailValid(email);

      if (!isEmail ) {
        return Util.sendError(res, "Invalid email or phone number format");
      }

      let user;
      if (isEmail) {
        user = await UserDao.getUserByEmail(email);
      } 

      if (!user) {
        return Util.sendError(res, "User not found");
      }

      // Check if the password is correct
      const isPasswordValid = await UserDao.authenticateUser(
        user.email,
        password
      );
      if (!isPasswordValid) {
        return Util.sendError(res, "Incorrect password");
      }

      // Generate and send token
      if (isPasswordValid) {
        Util.sendSuccess(res, isPasswordValid, "User logged succefully");
      }
    } catch (error) {
      console.error("Error in loginWithEmailOrPhone:", error);
      Util.sendError(res, "An internal server error occurred", 500);
    }
  }

  export async function updateUserRole(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        role,
      } = req.body;

      const user = req.user?._id.toString();
      if (!user) {
        return Util.sendError(res, "User not found");
      }
      const updatedUser = await UserDao.updateUser(user, {
        role,
      });
      Util.sendSuccess(res, updatedUser, "Preference updated successfully");
    } catch (error: any) {
      Util.sendError(res, error.message);
    }
  }

}

  


import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Util } from "../common/util";
import { UserDao } from "../dao/user-dao";
import {
  isEmailValid,
  Validation,
  passwordValidation,
} from "../common/validation";
import { DUser, Role} from "../models/user-model";


import { EmailService } from "../services/mail";
import { OTPDao } from "../dao/otp-dao";
import { OtpTypes } from "../enums/otpTypes";

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

  // export async function register(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const errors = validationResult(req);

  //     if (!errors.isEmpty()) {
  //       return Util.sendError(res, errors.array()[0]["msg"]);
  //     }

  //     const existingUser = await UserDao.getUserByEmail(req.body.email);

  //     if (existingUser !== null) {
  //       return Util.sendError(res, "Email already exists!");
  //     }

  //     const password = req.body.password;

  //     // Password requirements: at least 8 characters, one special character, one capital letter
  //     const isPasswordValid = passwordValidation(password);
  //     if (!isPasswordValid) {
  //       return Util.sendError(
  //         res,
  //         "Password must be at least 8 characters long and contain at least one special character and one uppercase letter"
  //       );
  //     }

  //     if (password !== req.body.confirmPassword) {
  //       return Util.sendError(
  //         res,
  //         "Password and confirmed password do not match"
  //       );
  //     }
  //     let roleEnum: Role;

  //     if (req.body.role === "CHILD") {
  //       roleEnum = Role.CHILD;
  //     } else {
  //       roleEnum = Role.TEACHER;
  //     }

  //     const data: DUser = {
       
  //       email: req.body.email,
  //       phoneNumber: req.body.phoneNumber,
  //       name: req.body.name,
  //       password: password,
  //       role: roleEnum

  //     };

  //     const token = await UserDao.createCustomer(data);

  //     await EmailService.sendWelcomeEmail(req.body.email,
  //           "Welcome to ClassQ",
  //           "Welcome to ClassQ",
  //           `Thank you for registering with us.`);

  //     Util.sendSuccess(res, token, "User registered");
  //   } catch (error) {
  //     console.error("Error in CustomerEp.register:", error);
  //     Util.sendError(res, "An internal server error occurred", 500);
  //   }
  // }

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
   
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.sendError(errors.array()[0]["msg"]);
    }

    const existingEmail = await UserDao.getUserByEmail(req.body.email);
    const existingPhone = await UserDao.getUserByPhone(req.body.phoneNumber); 
    if (existingEmail) {
      return Util.sendError(res, "Email already exists!");
    }
    if (existingPhone) {
      return Util.sendError(res, "Phone number already exists!");
    }

    const password = req.body.password;

    const isPasswordValid = passwordValidation(password);
    if (!isPasswordValid) {
      return Util.sendError(
        res,
        "Password must be at least 8 characters long, contain one special character, and one uppercase letter"
      );
    }

    if (password !== req.body.confirmPassword) {
      return Util.sendError(res, "Password and confirm password do not match");
    }

    let roleEnum: Role;
    if (req.body.role === "CHILD") {
      roleEnum = Role.CHILD;
    } else {
      roleEnum = Role.TEACHER;
    }

    const data: DUser = {
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      name: req.body.name,
      password: password,
      role: roleEnum,
    };

    const token = await UserDao.createCustomer(data);

    await EmailService.sendWelcomeEmail(
      req.body.email,
      "Welcome to ClassQ",
      "Welcome to ClassQ",
      `Thank you for registering with us.`
    );

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

  export async function forgetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const email = req.body.email;

    try {
     // const isPhoneNumber = isPhoneNumberValid(emailOrPhoneNumber);
      const isEmail = isEmailValid(email);

      if (!isEmail ) {
        return Util.sendError(res, "Invalid email or phone number format");
      }

      let user;
      if (isEmail) {
        user = await UserDao.getUserByEmail(email);
      } 
      // else if (isPhoneNumber) {
      //   user = await UserDao.getUserByPhoneNumber(emailOrPhoneNumber);
      // }

      if (!user) {
        return Util.sendError(res, "User not found");
      }
      // Generate and save OTP
      const expirationMinutes = 3;
      const otpDetails = await OTPDao.createOTP(
        user.email,
        expirationMinutes,
        OtpTypes.FORGET_PASSWORD
      );

      // Send the OTP to the user (e.g., via email or SMS)
      console.log(`Generated OTP for user ${email}: ${otpDetails.otp}`);

      if(isEmail){
        // await EmailService.sendTestEmail(
        //   user.email,
        //   "hEy"
        // );
        await EmailService.sendVerifyEmail(
          user.email,
          "One Time Password(O T P) Confirmation - ClassQ",
          otpDetails.otp,
          "Let's recover your ClassQ account.",
          `Hi there, thank you for signing up with ClassQ. Use the following code to recover your account.`
        );
        console.log("222222222")
        Util.sendSuccess(res, null, "OTP generated successfully");
      }

      // if(isPhoneNumber){
      // // await sendMsg();
      // console.log("OTP for " + req.body.emailOrPhoneNumber + " is " + otpDetails.otp);
      // const text = `Your OTP code is ${otpDetails.otp}. Do not share this code.`;
      // const smsStatus = await SMSService.sendSMS(emailOrPhoneNumber, text);
      // if (smsStatus) {
      //   Util.sendSuccess(res, user, "Send OTP to verify mobile number");
        
      // } else {
        
      //   Util.sendError(
      //     res,
      //     "Couldn't send SMS code to the given phoneNumber",
      //     500
      //   );
      // }
      // }
     
    } catch (error: any) {    
      Util.sendError(res, error.message);
    }
  }

  export async function checkOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return Util.sendError(res, errors.array()[0]["msg"]);
      }

      const { email, otp } = req.body;

     // const isPhoneNumber = isPhoneNumberValid(emailOrPhoneNumber);
      const isEmail = isEmailValid(email);

      if (!isEmail ) {
        return Util.sendError(res, "Invalid email or phone number format");
      }

      let user;
      if (isEmail) {
        user = await UserDao.getUserByEmail(email);
      } 
      // else if (isPhoneNumber) {
      //   user = await UserDao.getUserByPhoneNumber(emailOrPhoneNumber);
      // }

      if (!user) {
        return Util.sendError(res, "User not found");
      }

      // Check OTP validity.
      const otpDetails = await OTPDao.getLatestOTP(user.email);
      if (!otpDetails || otpDetails.otp !== otp) {
        return Util.sendError(res, "Invalid OTP");
      }
      const currentTime = new Date();
      if (otpDetails.expiresAt < currentTime) {
        return Util.sendError(res, "Expired OTP");
      }

      const resetToken = Util.generateResetToken(user.email);
      return Util.sendSuccess(res, { resetToken }, "OTP is valid");
    } catch (error) {
      next(error);
    }
  }

  export async function resetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return Util.sendError(res, errors.array()[0]["msg"]);
      }

      const { email, newPassword, resetToken } = req.body;

      //const isPhoneNumber = isPhoneNumberValid(emailOrPhoneNumber);
      const isEmail = isEmailValid(email);

      if (!isEmail ) {
        return Util.sendError(res, "Invalid email or phone number format");
      }

      let user;
      if (isEmail) {
        user = await UserDao.getUserByEmail(email);
      }
      //  else if (isPhoneNumber) {
      //   user = await UserDao.getUserByPhoneNumber(emailOrPhoneNumber);
      // }

      if (!user) {
        return Util.sendError(res, "User not found");
      }

      if (!Util.verifyResetToken(user.email, resetToken)) {
        return Util.sendError(res, "Invalid or expired reset token");
      }

      const isPasswordValid = passwordValidation(newPassword);
      if (!isPasswordValid) {
        return Util.sendError(
          res,
          "Password must be at least 8 characters long and contain at least one special character and one uppercase letter"
        );
      }
      // Update user's password
      //const user = await UserDao.getUserByEmail(user.email);
      if (user) {
        // const hashed = await Util.passwordHashing(newPassword);
        const newHashedPassword = await Util.passwordHashing(newPassword);
        await UserDao.updateUser(user?._id, { password: newHashedPassword });

        // Delete OTP after successful password reset
        await OTPDao.deleteOTP(user.email);

        return Util.sendSuccess(
          res,
          null,
          "Your password is changed successfully & You can login now"
        );
      } else {
        return Util.sendError(res, "User not found");
      }
    } catch (error) {
      next(error);
    }
  }

}

  


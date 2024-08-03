import { check } from "express-validator";
import { Role } from "../models/user-model";
// import { MobilePhoneLocale } from "express-validator/src/options";
import { Types } from "mongoose";

export const Validation = {
  email: () =>
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is required!")
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid email address and Check again!"),
  // phone: () =>
  //   check("phone")
  //     .isMobilePhone(<MobilePhoneLocale>"SL")
  //     .withMessage("Phone number is invalid or outside the SL"),
  password: () =>
    check("password")
      .isString()
      .not()
      .isEmpty()
      .withMessage("Password is required!")
      .isLength({ min: 6, max: 40 })
      .withMessage(
        "Password must be at least 6 chars long & not more than 40 chars long!"
      )
      .not()
      .isIn(["123", "password", "god", "abc"])
      .withMessage("Do not use a common word as the password")
      .matches(/\d/)
      .withMessage("Password must contain a number!"),
  role: (role: Role) =>
    check("role").equals(role).withMessage("Unauthorized user role!"),
  noPermissions: () => check("permissions").not().exists(),
  name: () =>
    check("name")
      .not()
      .isEmpty()
      .withMessage("Name is required!")
      .isString()
      .isLength({ max: 1000 })
      .withMessage("Name field should not be more than 1000 chars long!"),
  objectId: (key: string = "_id") =>
    check(key)
      .not()
      .isEmpty()
      .withMessage(`${key} cannot be empty`)
      .custom((v) => isObjectId(v))
      .withMessage(`${key} is not a valid mongoDb objectID`),
  upload: (key: string = "upload") =>
    check()
      .not()
      .isEmpty()
      .withMessage(`${key} cannot be empty`)
      .custom((v) => isObjectId(v))
      .withMessage(`${key} is invalid`),
  uploads: (key: string = "uploads") =>
    check(`${key}.*._id`)
      .not()
      .isEmpty()
      .withMessage(`${key} objects cannot be empty`)
      .custom((v) => isObjectId(v))
      .withMessage(`${key} objects are invalid`),
};

export function isObjectId(v: string): boolean {
  return Types.ObjectId.isValid(v) && new Types.ObjectId(v).toHexString() === v;
}

// export function isPhoneNumberValid(value: string): boolean {
//   const phoneRegex = /^\+\d{1,3}\d{6,14}$/;
//   return phoneRegex.test(value);
// }

export function isEmailValid(value: string): boolean {
  // Check if the identifier is an email or a phone number
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

export function passwordValidation(password: string): boolean {
  // Password requirements: at least 8 characters, one special character, one capital letter
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
  return passwordRegex.test(password);
}

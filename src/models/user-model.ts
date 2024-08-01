import * as mongoose from "mongoose";
import { ObjectIdOr, StringOrObjectId } from "../common/util";


export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  CHILD="CHILD",
  TEACHER = "TEACHER"
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  DONT_PREFER_TO_DISCLOSE = "DONT_PREFER_TO_DISCLOSE",
}

export enum Permission {
  MANAGE_CUSTOMERS = "MANAGE_CUSTOMERS",
  MANAGE_CONTACT_MESSAGES = "MANAGE_CONTACT_MESSAGES",
  MANAGE_SERVICE = "MANAGE_SERVICE",
  MANAGE_UPLOAD = "MANAGE_UPLOAD",
  MANAGE_BLOG = "MANAGE_BLOG",
  MANAGE_PAYMENTS = "MANAGE_PAYMENTS",
  MANAGE_EMAIL_SUBSCRIPTIONS = "MANAGE_EMAIL_SUBSCRIPTIONS",
}
export enum SubscriptionStatus {
  ACTIVE = "active",
  PAST_DUE = "past_due",
  UNPAID = "unpaid",
  CANCELED = "canceled",
  INCOMPLETE = "incomplete",
  INCOMPLETE_EXPIRED = "incomplete_expired",
  TRIALING = "trialing",
  ALL = "all",
  ENDED = "ended",
}

export enum Medium {
  FACEBOOK = "FACEBOOK",
  GOOGLE = "GOOGLE",
  IOS_GOOGLE = "IOS_GOOGLE",
  EMAIL = "EMAIL",
  APPLE = "APPLE",
}



interface CommonAttributes {
  name: string;
  email: string;
  password?: string;
  role?: Role;
  phoneNumber: string;
}

export interface DUser extends CommonAttributes {
  _id?: StringOrObjectId;
}

export interface IUser extends CommonAttributes, mongoose.Document {
  
  createAccessToken(): string;

  comparePassword(password: string): Promise<boolean>;

  hasPermission(...permissions: Permission[]): boolean;
}

export interface UserDetails {
  user: IUser; // Assuming IUser is the correct user interface
  
}


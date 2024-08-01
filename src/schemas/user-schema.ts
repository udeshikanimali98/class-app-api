import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import * as bcrypt from "bcryptjs";
import { IUser, Permission, Role } from "../models/user-model";
import { checkPermission } from "../middleware/verify-permission";


const jwt = require("jsonwebtoken");


export const UserSchemaOptions: mongoose.SchemaOptions = {
  _id: true,
  id: false,
  timestamps: true,
  skipVersioning: { skip: true },
  strict: false,
  discriminatorKey: "role",
  toJSON: {
    getters: true,
    virtuals: true,
    transform: (doc, ret) => {
      // delete ret._id;
      delete ret.password;
    },
  },
};

export const userSchema = new mongoose.Schema(
  {
    email: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
    name: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: false,
    },
    role: {
      type: Schema.Types.String,
      enum: Object.values(Role),
      required: false,
    },
    phoneNumber: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
    
  },
  UserSchemaOptions
);

userSchema.pre("save", function (next) {
  const user: any = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  // noinspection JSIgnoredPromiseFromCall
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    // noinspection JSIgnoredPromiseFromCall
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.createAccessToken = function (expiresIn: string = "24h") {
  return jwt.sign({ user_id: this._id }, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });
};

userSchema.methods.comparePassword = function (
  password: any
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // noinspection JSIgnoredPromiseFromCall
    // @ts-ignore
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err) {
        return reject(err);
      }
      return resolve(isMatch);
    });
  });
};

userSchema.methods.hasPermission = function (
  ...permissions: Permission[]
): boolean {
  // @ts-ignore
  const [success] = checkPermission(this, permissions);
  return success;
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;

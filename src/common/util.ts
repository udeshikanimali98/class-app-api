import { NextFunction, Request, Response } from "express";
import { ErrorLogger } from "./logging";
import * as mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const jwksClient = require("jwks-rsa");
import Decimal from "decimal.js";

export type ObjectIdOr<T extends mongoose.Document> =
  | mongoose.Types.ObjectId
  | T;

export type StringOrObjectId = string | mongoose.Types.ObjectId;

export namespace Util {
  export function sendSuccess(
    res: Response,
    data: any,
    message?: string | null
  ) {
    return res.send({ success: true, data: data, message: message || null });
  }

  export function sendError(res: Response, error: any, errorCode = 0) {
    if (typeof error === "string") {
      return res.send({
        success: false,
        error: error,
        errorCode: errorCode,
        message: error,
      });
    } else {
      if (!error) {
        error = { stack: null, message: "Unknown Error" };
      }
      ErrorLogger.error(error.stack);
      return res.send({
        success: false,
        error: error.message,
        errorData: error,
        errorCode: errorCode,
        message: error.message,
      });
    }
  }

  export function withErrorHandling(
    requestHandler: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<any>
  ) {
    return function updateProject(
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      requestHandler(req, res, next).catch(next);
    };
  }

  export function addDays(date: Date, days: number) {
    // @ts-ignore
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  export async function passwordHashing(password: string): Promise<string> {
    const saltRounds = 10;

    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (saltErr, salt) => {
        if (saltErr) {
          reject(saltErr);
        } else {
          bcrypt.hash(password, salt, (hashErr, hashedPassword) => {
            if (hashErr) {
              reject(hashErr);
            } else {
              resolve(hashedPassword);
            }
          });
        }
      });
    });
  }

  export function generateResetToken(email: string): string {
    const secretKey = process.env.JWT_SECRET || "your-secret-key";
    const expiresIn = "10m"; // Set your desired expiration time

    const resetToken = jwt.sign({ email }, secretKey, { expiresIn });
    return resetToken;
  }

  export function verifyResetToken(email: string, token: string): boolean {
    try {
      const secretKey = process.env.JWT_SECRET || "your-secret-key";
      const decoded = jwt.verify(token, secretKey) as { email: string };

      // Check if the decoded email matches the provided email
      return decoded.email === email;
    } catch (error) {
      // Token verification failed
      return false;
    }
  }

  export async function getAppleSingInKey(kid: string) {
    const client = jwksClient({
      jwksUri: "https://appleid.apple.com/auth/keys",
    });

    try {
      const key = await client.getSigningKey(kid);

      return key.getPublicKey();
    } catch (error) {
      return null;
    }
  }

  export function verifyJWT(json: any, publicKey: string) {
    return new Promise((resolve) => {
      jwt.verify(json, publicKey, (error: any, payload: any) => {
        if (error) {
          return resolve(null);
        } else {
          resolve(payload);
        }
      });
    });
  }

  export function getLimitOffset(limit: string, offset: string) {
    if (typeof limit == "string" || typeof offset == "string") {
      const isLimitNumeric = /^[0-9]*$/.test(limit);
      const isOffsetNumeric = /^[0-9]*$/.test(offset);
      if (isLimitNumeric && isOffsetNumeric) {
        const off = parseInt(offset);
        const lim = parseInt(limit);
        return { off, lim };
      } else {
        return { off: 1, lim: 10 };
      }
    } else {
      return { off: 1, lim: 10 };
    }
  }

  export function getAmountInCents(value: string) {
    const decimalValue = new Decimal(value);
    const multipliedValue = decimalValue.times(100);
    return multipliedValue.toNumber();
  }

}

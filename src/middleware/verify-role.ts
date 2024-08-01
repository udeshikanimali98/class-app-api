import {Role} from "../models/user-model";
import {NextFunction, Request, Response} from "express";
import {ApplicationError} from "../common/application-error";

export function verifyRole(...roles: Role[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (roles.includes(<Role>req.user!.role)) {
            next();
        } else {
            throw new ApplicationError("Permission denied.");
        }
    };
}

/// <reference path="../../global.d.ts" />
import {Permission, Role} from "../models/user-model";
import {NextFunction, Request, Response} from "express";
import {ApplicationError} from "../common/application-error";
import User = Express.User;

export function verifyPermission(...permissions: Permission[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        const [success, message] = checkPermission(req.user!, permissions);
        if (success) {
            next();
        } else {
            throw new ApplicationError(message);
        }
    };
}

export function checkPermission(user: User, permissions: Permission[]): [boolean, string] {
    switch (user.role) {
        case Role.SUPER_ADMIN:
            break;
        case Role.ADMIN:
            if (permissions) {
                if (!user.permissions.find(p => permissions.includes(<Permission>p))) {
                    return [false, "Permission denied"];
                }
            }
            break;
        case Role.CHILD:
            return [false, "Customer don't have special privileges"];
        default:
            return [false, "Unknown user role"];
    }
    return [true, ''];
}

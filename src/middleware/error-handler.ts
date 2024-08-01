import {NextFunction, Request, Response} from 'express';
import {AppLogger, ErrorLogger} from '../common/logging';
import {ApplicationError} from '../common/application-error';
import * as mongoose from "mongoose";
import {Util} from "../common/util";

export function handleError(error: Error, req: Request, res: Response, next: NextFunction) {
    AppLogger.error(error.message);
    if (error instanceof ApplicationError) {
        Util.sendError(res, error.message);
    } else if (error instanceof mongoose.Error) {
        Util.sendError(res, error.message, 1);
    } else {
        ErrorLogger.error(error!.stack);
        Util.sendError(res, "An internal server error occurred", 1);
    }
}

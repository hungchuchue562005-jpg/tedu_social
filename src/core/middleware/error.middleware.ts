import { HttpException } from "@core/exceptions";
import { NextFunction, Response ,Request } from "express";
import { Logger } from "@core/utils";
const errorMiddleware = (error: HttpException,
     req: Request, 
     res: Response,
    next: NextFunction) => {
    const status : number = error.status || 500;
    const message : string = error.message || "Something went wrong";

    Logger.error(`[ERROR] - Status: ${status} - Msg: ${message}`);
    res.status(status).json ({
             message:message
    }) ;

};
export default errorMiddleware;
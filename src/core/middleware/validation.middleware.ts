import { NextFunction, Request, RequestHandler, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import Logger from "@core/utils/logger";
import { HttpException } from "@core/exceptions";

const validationMiddleware = (type: any, skipMissingProperties = false): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        validate(plainToInstance(type, req.body), { skipMissingProperties }).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                Logger.error(errors);

                const message = errors
                    .map((error: ValidationError) => {
                        return Object.values(error.constraints!).join(", ");
                    })
                    .join(", ");

                next(new HttpException(400, message));
            } else {
                next();
            }
        });
    };
};

export default validationMiddleware;
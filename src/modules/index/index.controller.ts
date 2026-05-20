import { NextFunction, Request, Response } from "express";

export default class IndexController {
    public index = (req: Request, res: Response, next: NextFunction) => {
        try{
            res.status(200).json({
                message: "Welcome to TEDU Social API"
            });
        } catch (error) {
            next(error);
        }

    }   

}
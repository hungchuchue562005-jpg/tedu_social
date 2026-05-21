import type { Route } from "@core/interface";
import IndexController from "./index.controller";
import { Router } from "express";

export default class Indexroute implements Route {
    public path = "/";
    public router = Router();

    public indexController = new IndexController();
    
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.indexController.index);
    }
}
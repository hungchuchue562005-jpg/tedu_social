import { Router } from "express";
import { Route } from "@core/interface";
import AuthController from "./auth.controller";
import authMiddleware from "@/core/middleware/auth.middleware";

export default class AuthRoute implements Route {
  public path = "/api/auth";
  public router = Router();

  private authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
     "/",
      this.authController.login
    ); // POST: http://localhost:3002/api/auth

      this.router.get(
     "/",
      authMiddleware,
      this.authController.getCurrentLoginUser
    ); // GET: http://localhost:3002/api/auth --> Require login 
  }
}
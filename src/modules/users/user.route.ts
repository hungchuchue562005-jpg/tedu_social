import { Router } from "express";
import {Route} from "@core/interface";
import UserController from "./users.controller";
import validationMiddleware from "@/core/middleware/validation.middleware";
import RegisterDto from "./dtos/register.dto";
import { authMiddleware } from "@/core/middleware";

export default class UsersRoute implements Route {
    public path = '/api/users';
    public router = Router();
    private userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

   private initializeRoutes() {
  this.router.post(
    "/",
    validationMiddleware(RegisterDto, true),
    this.userController.register
  );

  this.router.get(
    "/:id",
    this.userController.getUserById
  );

    this.router.get( "/" ,this.userController.getAll );
   
    this.router.get(  "/paging/:page",
    this.userController.getAllPaging
  );

  this.router.put(  "/:id",   validationMiddleware(RegisterDto, true),
    this.userController.updateUser
  );

  this.router.delete( "/:id", authMiddleware, this.userController.deleteUser  );
}

    
}
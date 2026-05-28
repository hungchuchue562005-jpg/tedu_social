import CreatePostDto from './dtos/create_post.dto';
import PostsController from './posts.controller';
import { Router } from 'express';
import { authMiddleware } from '@core/middleware';
import validationMiddleware from '@core/middleware/validation.middleware';
import Route from '@/core/interface/routes.interface';

 class PostsRoute implements Route {
  public path = '/api/v1/posts';
  public router = Router();

  public postController = new PostsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
       '/',
      authMiddleware,
      validationMiddleware(CreatePostDto, true),
      this.postController.createPost
    );

    this.router.put(
      '/:id',
      authMiddleware,
      validationMiddleware(CreatePostDto, true),
      this.postController.updatePost
    );
     this.router.get(
        
        '/',
        this.postController.getAllPosts);

         this.router.get(
    '/paging/:page',
    this.postController.getAllPaging
    );
    this.router.get(
      '/:id',
      this.postController.getPostById
    );
   
  }
}

export default PostsRoute;
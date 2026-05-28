import { authMiddleware, validationMiddleware } from '@core/middleware';
import AddEducationDto from './dtos/add_education.dto';
import AddExperienceDto from './dtos/add_experience.dto';
import CreateProfileDto from './dtos/create_profile.dto';
import ProfileController from './profile.controller';
import type { Route } from '@core/interface';
import { Router } from 'express';

class ProfileRoute implements Route {
  public path = '/api/v1/profile';
  public router = Router();
  public profileController = new ProfileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.profileController.getAllProfiles);
    this.router.get('/user/:id', this.profileController.getByUserId);

    this.router.get(
      '/me',
      authMiddleware,
      this.profileController.getCurrentProfile
    );

    this.router.get('/:id', this.profileController.getByProfileId);

    this.router.post(
      '/',
      authMiddleware,
      validationMiddleware(CreateProfileDto),
      this.profileController.createProfile
    );

    this.router.delete(
      '/:id',
      authMiddleware,
      this.profileController.deleteProfile
    );

    this.router.put(
      '/experience',
      authMiddleware,
      validationMiddleware(AddExperienceDto),
      this.profileController.createExperience
    );

    this.router.delete(
      '/experience/:exp_id',
      authMiddleware,
      this.profileController.deleteExperience
    );

    this.router.put(
      '/education',
      authMiddleware,
      validationMiddleware(AddEducationDto),
      this.profileController.createEducation
    );

    this.router.delete(
      '/education/:edu_id',
      authMiddleware,
      this.profileController.deleteEducation
    );

    this.router.post(
      '/following/:id',
      authMiddleware,
      this.profileController.follow
    );

    this.router.delete(
      '/following/:id',
      authMiddleware,
      this.profileController.unFollow
    );

    this.router.post(
      '/friends/:id',
      authMiddleware,
      this.profileController.addFriend
    );

    this.router.delete(
      '/friends/:id',
      authMiddleware,
      this.profileController.unFriend
    );

    this.router.put(
      '/friends/:id',
      authMiddleware,
      this.profileController.acceptFriendRequest
    );
  }
}

export default ProfileRoute;

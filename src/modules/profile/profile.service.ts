import { IEducation, IExperience, IProfile, ISocial } from './profile.interface';
import ProfileSchema from './profile.model';
import { HttpException } from '@core/exceptions';
import normalize from 'normalize-url';
import CreateProfileDto from './dtos/create_profile.dto';
import { UserSchema } from '@modules/users';
import AddExperienceDto from './dtos/add_experience.dto';
import AddEducationDto from './dtos/add_education.dto';


class ProfileService {
  public async getCurrentProfile(userId: string): Promise<IProfile> {
    return this.getProfileByUserId(userId);
  }

  public async getProfileByUserId(userId: string): Promise<IProfile> {
    const profile = await ProfileSchema.findOne({ user: userId })
      .populate('user', ['first_name', 'last_name', 'avatar'])
      .exec();

    if (!profile) {
      throw new HttpException(404, 'There is no profile for this user');
    }

    return profile;
  }

  public async getProfileById(profileId: string): Promise<IProfile> {
    const profile = await ProfileSchema.findById(profileId)
      .populate('user', ['first_name', 'last_name', 'avatar'])
      .exec();

    if (!profile) {
      throw new HttpException(404, 'Profile is not found');
    }

    return profile;
  }

  public async createProfile(
    userId: string,
    profileDto: CreateProfileDto
  ): Promise<IProfile> {
    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = profileDto;

    const profileFields: Partial<IProfile> = {
      user: userId,
      company: company,
      location: location,
      website:
        website && website !== ''
          ? normalize(website.toString(), { forceHttps: true })
          : '',
      bio: bio,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill: string) => ' ' + skill.trim()),
      status: status,
    };

    const socialFields: ISocial = {
      youtube: youtube,
      twitter: twitter,
      instagram: instagram,
      linkedin: linkedin,
      facebook: facebook,
    };

    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0) {
        socialFields[key as keyof ISocial] = normalize(value.toString(), {
          forceHttps: true,
        });
      }
    }

    profileFields.social = socialFields;

    const profile = await ProfileSchema.findOneAndUpdate(
      { user: userId },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).exec();

    return profile;
  }

    public async deleteProfile(userId: string): Promise<void> {
    await ProfileSchema.findOneAndDelete({ user: userId }).exec();

    await UserSchema.findByIdAndDelete({ _id: userId }).exec();
    }

    public async getAllProfiles(): Promise<IProfile[]> {
      const profiles = await ProfileSchema.find()
        .populate('user', ['first_name', 'last_name', 'avatar'])
        .exec();
        return profiles;
    }

   
  public addEducation = async (userId: string, education: AddEducationDto) => {
    const newEdu = {
      ...education,
    };

    const profile = await ProfileSchema.findOne({ user: userId }).exec();
    if (!profile) {
      throw new HttpException(400, 'There is not profile for this user');
    }

    profile.education.unshift(newEdu as IEducation);
    await profile.save();

    return profile;
  };

     public deleteEducation = async (userId: string, educationId: string) => {
        const profile = await ProfileSchema.findOne({ user: userId }).exec();

        if (!profile) {
        throw new HttpException(400, 'There is not profile for this user');
        }

        profile.education = profile.education.filter(
        (edu) => edu._id.toString() !== educationId
        );
        await profile.save();
        return profile;
    };


   public addExperience = async (
    userId: string,
    experience: AddExperienceDto
  ) => {
    const newExp = {
      ...experience,
    };

    const profile = await ProfileSchema.findOne({ user: userId }).exec();
    if (!profile) {
      throw new HttpException(400, 'There is not profile for this user');
    }

    profile.experience.unshift(newExp as IExperience);
    await profile.save();

    return profile;
  };

    public deleteExperience = async (userId: string, experienceId: string) => {
    const profile = await ProfileSchema.findOne({ user: userId }).exec();

    if (!profile) {
      throw new HttpException(400, 'There is not profile for this user');
    }

    profile.experience = profile.experience.filter(
      (exp) => exp._id.toString() !== experienceId
    );
    await profile.save();
    return profile;
  };



}

export default ProfileService;

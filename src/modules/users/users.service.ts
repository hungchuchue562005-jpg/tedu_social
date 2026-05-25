import RegisterDto from './dtos/register.dto';
import UserSchema from './users.model';
import { isEmptyObject } from '@core/utils/helpers';
import { HttpException } from '@core/exceptions';
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import IUser from './users.interface';
import { DataStoredInToken, TokenData } from '../auth';
import jwt from 'jsonwebtoken';
class UserService {
    public userSchema =  UserSchema;

    public async createUser(model: RegisterDto): Promise<TokenData>  {
      if(isEmptyObject(model)) {
        throw new HttpException(400, 'Model is empty');
      }
      const user = await this.userSchema.findOne({email: model.email});
        if(user) {
            throw new HttpException(409, `This email ${model.email} already exists`);
        }   
        const avatar = gravatar.url(model.email, {
            size: '200',
             rating: 'g',
            default: 'mm'
            });

          const salt = await bcryptjs.genSalt(10);

          const hashedPassword = await bcryptjs.hash(model.password!, salt); 

          const createdUser  = await this.userSchema.create({
            ...model,
            password: hashedPassword,
            avatar: avatar,
            date: Date.now(),
          });
          return this.createToken(createdUser);
    }

     public async updateUser(
       userId:string,
      model: RegisterDto): Promise<IUser>  {
      if(isEmptyObject(model)) {
        throw new HttpException(400, 'Model is empty');
      }
      const user = await this.userSchema.findById(userId) .exec();
        if(!user) {
            throw new HttpException(400, `User id is not exist`);
        }

        let avatar = user.avatar; 
        if(user.email === model.email)
          {
          throw new HttpException(400,' You must using the difference email');
          }
          else{
               avatar = gravatar.url(model.email, {
            size: '200',
             rating: 'g',
            default: 'mm'
            });
          }
       
        let updateUserById;
        if (model.password){
          const salt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(model.password,salt);
          updateUserById = await this.userSchema.findByIdAndUpdate(userId,{
            ...model,
            avatar: avatar,
            password:hashedPassword,
          })
          .exec()
        }
        else {
          updateUserById = await this.userSchema.findByIdAndUpdate( userId,{
            ...model,
            avatar :avatar,
          }
          ).exec();
        }
        if (!updateUserById) throw new HttpException (409, 'You are not an user');
          return updateUserById;
      }
          
         public async getUserById (userId: string): Promise<IUser>  {
            const user = await this.userSchema.findById(userId) .exec();
            if(!user) {
                throw new HttpException(404, `User is not exists`);
            }   
              return user;
        }

    private createToken(user: IUser): TokenData {
        const dataStoredInToken: DataStoredInToken = { id: user._id };
        const secret: string = process.env.JWT_TOKEN_SECRET! ;
        const expiresIn: number = 3600; // 1 hour
        return{
          token: jwt.sign(dataStoredInToken, secret, { expiresIn: expiresIn })
        }
        };
    }

    export default UserService;
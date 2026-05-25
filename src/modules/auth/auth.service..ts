import { DataStoredInToken, IUser, TokenData } from '../auth';
import { HttpException } from '@core/exceptions';
import LoginDto from './auth.dto';
import { isEmptyObject } from '@core/utils/helpers';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {UserSchema} from '@modules/users';
class AuthService {
    public userSchema =  UserSchema;

    public async login (model: LoginDto): Promise<TokenData>  {
      if(isEmptyObject(model)) {
        throw new HttpException(400, 'Model is empty');
      }
      const user  = await this.userSchema.findOne({email: model.email}) .exec();
        if(!user) {
            throw new HttpException(400, 'Credential is not valid');
        }   
            const isMatchPassword = await bcryptjs.compare(model.password,user.password);
            if (!isMatchPassword) throw new HttpException (400,'Credential is not valid');
          
            return this.createToken(user);
    }

      public async getCurrentLoginUser (userId: string): Promise<IUser>  {
        const user = await this.userSchema.findById(userId) .exec();
    
        if(!user) {
            throw new HttpException(404, `User is not exists`);
        }   
          return user;
    }

      public async getAll (): Promise<IUser[]>  {
        const users = await this.userSchema.find() .exec();
          return users;
    }

        public async getAllPaging (): Promise<IUser[]>  {
        const users = await this.userSchema.find() .exec();
          return users;
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

    export default AuthService;

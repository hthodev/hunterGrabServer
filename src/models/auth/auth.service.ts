import { HttpException } from '@nestjs/common';
import { IResponseGoogle, IUserLogin } from './auth.interface';
import { User, UserDocument } from 'src/models/users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { comparePassword, hashPassword, randomString } from 'src/shares/ultis';
import { constants } from 'src/shares/constants';

const { AUTH, USER } = constants;

export class AuthService {
  @InjectModel(User.name)
  private userModel: Model<UserDocument>;

  async verifyGoogle(payload: IResponseGoogle) {
    const { email, email_verified, name, picture, given_name, family_name } =
      payload;

    try {
      let user: UserDocument = await this.userModel.findOne({ email }).lean();
      if (!user?._id) {
        const match = email.match(/^([^.@]+)/);
        const username = `${match[0]}${randomString()}`;
        user = (
          await this.userModel.create({
            username,
            email,
            firstName: given_name,
            lastName: family_name,
            image: picture,
            score: 0,
            sex: null,
            phoneNumber: null,
            positions: ['GUEST'],
          })
        ).toJSON();
      }
      return user;
    } catch (error) {
      if (error.status === 500) {
        throw new HttpException('Something error from server', 500);
      }
      throw error;
    }
  }

  async loginNormal(payload: { email: string; password: string }) {
    const { email, password } = payload;
    const user = await this.userModel
      .findOne({
        email,
      })
      .lean();
    if (!user) throw new HttpException('Email incorrect!', 400);
    if (user.method === AUTH.METHOD_LOGIN.GOOGLE && !user.password) {
      throw new HttpException('Login with google, or set password to login with account', 400)
    }
    if (!(await comparePassword(password, user.password))) {
      throw new HttpException('Password incorrect!', 400);
    }
    return user;
  }

  async registry(payload: IRegistry) {
    const { email, password, username, gender, firstName, lastName } = payload;
    const user = await this.userModel.create({
      email,
      password: hashPassword(password),
      username,
      gender,
      firstName,
      lastName,
      positions: ['GUEST'],
      image:
        gender === USER.SEX.FEMALE
          ? USER.IMAGE_FOR_SEX.FEMALE
          : USER.IMAGE_FOR_SEX.MALE,
    });
    return user.toJSON();
  }
}

interface IRegistry {
  email: string;
  password: string;
  username: string;
  gender: string;
  firstName: string;
  lastName: string;
}

// function comparePassword(passwordInput, password): any {
//   passwordInput = hashPassword(passwordInput),
//   return bcrypt.compareSync(passwordInput, password);
// }

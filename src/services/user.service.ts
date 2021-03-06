import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { MailService } from './mail.service';
import { TokenService } from './token.service';
import { IUser, User } from '../core/data/user';
import { IAuthSuccess } from '../core/data/register';
import config from '../assets/config.json';
import { MDocument } from '../core/types';
import { ErrorService } from '../core/exceptions/api.error';
import { FileService } from './file.service';

interface IUserDetails {
  name?: string;
  about?: string;
}

export class UserService {
  public static async register(email: string, password: string): Promise<IAuthSuccess> {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ErrorService.BadRequest('This email is already used');
    }
    const hashPass = await bcrypt.hash(password, 3);
    const activationLink = v4();
    const user = new UserModel({ email, password: hashPass, activationLink });
    await user.save();

    const link = `${config.appUrl}/api/activate/${activationLink}`;
    const mailService = new MailService();
    mailService.sendActivationMail(email, link);
    const userData = new User(user);
    const jwt = TokenService.generateToken(userData.toJSON());
    await TokenService.saveToken(userData.id, jwt.refreshToken);
    return { user: userData, jwt };
  }

  public static async activate(activationLink: string): Promise<void> {
    const user: MDocument<IUser> = await UserModel.findOne({ activationLink });

    if (!user) {
      throw ErrorService.BadRequest('Incorrect activation link');
    }
    user.isActivated = true;
    await user.save();
  }

  public static async login(email: string, password: string): Promise<IAuthSuccess> {
    const user: MDocument<IUser> = await UserModel.findOne({ email });

    if (!user) {
      throw ErrorService.BadRequest('No user with such email');
    }
    const isPathEquals = await bcrypt.compare(password, user.password);
    if (!isPathEquals) {
      throw ErrorService.BadRequest('Incorrect password');
    }
    const userData = new User(user);
    const jwt = TokenService.generateToken(userData.toJSON());
    await TokenService.saveToken(userData.id, jwt.refreshToken);
    return { user: userData, jwt };
  }

  public static async logaut(refreshToken: string): Promise<void> {
    await TokenService.removeToken(refreshToken);
  }

  public static async refresh(refreshToken: string): Promise<IAuthSuccess> {
    if (!refreshToken) {
      throw ErrorService.UnauthorisedError();
    }
    const userFromToken = TokenService.validateRefreshToken<IUser>(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userFromToken || !tokenFromDb) {
      throw ErrorService.UnauthorisedError();
    }
    const userData = await UserModel.findById(userFromToken.id);
    const user = new User(userData);
    const jwt = TokenService.generateToken(user.toJSON());
    await TokenService.saveToken(user.id, jwt.refreshToken);
    return { user: user, jwt };
  }

  public static async updateInfo(userId: string, details: IUserDetails): Promise<IUser> {
    const userData: MDocument<IUser> = await UserModel.findById(userId);
    userData.name = details.name || userData.name;
    userData.about = details.about || userData.about;
    await userData.save();
    const user = new User(userData);
    return user;
  }

  public static async saveAvatar(data: Buffer, contentType: string, userId: string): Promise<string> {
    const imgId = await FileService.saveFile(data, contentType);
    const userData: MDocument<IUser> = await UserModel.findById(userId);
    userData.avatar = imgId;
    await userData.save();
    return imgId;
  }
}

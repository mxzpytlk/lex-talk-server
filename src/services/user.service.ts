import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { MailService } from './mail.service';
import { TokenService } from './token.service';
import { IUser, User } from '../core/data/user';
import { IRegisterSuccess } from '../core/data/register';
import config from '../assets/config.json';
import { MDocument } from '../core/types';
import { ApiError } from '../exceptions/api.error';

export class UserService {
  public static async register(email: string, password: string): Promise<IRegisterSuccess> {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest('This email is already used');
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
      throw ApiError.BadRequest('Incorrect activation link');
    }
    user.isActivated = true;
    await user.save();
  }
}

import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { MailService } from './mail.service';
import { TokenService } from './token.service';
import { User } from '../core/data/user';
import { IRegisterSuccess } from '../core/data/register';

export class UserService {
  public static async register(email: string, password: string): Promise<IRegisterSuccess> {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw Error('This email is already used');
    }
    const hashPass = await bcrypt.hash(password, 3);
    const user = new UserModel({ email, password: hashPass });
    await user.save();

    const activatedLink = v4();
    MailService.sendActivationMail(email, activatedLink);
    const userData = new User(user);
    const jwt = TokenService.generateToken(userData.toJSON());
    await TokenService.saveToken(userData.id, jwt.refreshToken);
    return { user: userData, jwt };
  }
}

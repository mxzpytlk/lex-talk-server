import { ILexTalkConfig } from '../core/data/lex-talk-config.interface';
import { IUser } from '../core/data/user';
import { MDocument } from '../core/types';
import { UserModel } from '../models/user.model';
import ConfigModel from '../models/lex-talk-config.model';

export class LexTalkConfigService {
  public static async updateConfig(userId: string, newConfig: Partial<ILexTalkConfig>): Promise<ILexTalkConfig> {
    const user: MDocument<IUser> = await UserModel.findById(userId);
    const configId = user.lexTalkConfig;
    if (!configId) {
      const config: MDocument<ILexTalkConfig> = new ConfigModel({ ...newConfig });
      await config.save();
      user.lexTalkConfig = config._id;
      await user.save();
      return { lang: config.lang, darkMode: !!config.darkMode };
    }

    const config: MDocument<ILexTalkConfig> = await ConfigModel.findById(configId);
    if (newConfig.lang) {
      config.lang = newConfig.lang;
    }
    if ('darkMode' in newConfig) {
      config.darkMode = newConfig.darkMode;
    }
    await config.save();
    const { lang, darkMode } = config;
    return { lang, darkMode };
  }

  public static async getConfig(userId: string): Promise<ILexTalkConfig> {
    const user: MDocument<IUser> = await UserModel.findById(userId);
    const configId = user.lexTalkConfig;
    if (!configId) {
      return null;
    }
    const config: MDocument<ILexTalkConfig> = await ConfigModel.findById(configId);
    const { lang, darkMode } = config;
    return { lang, darkMode };
  }
}

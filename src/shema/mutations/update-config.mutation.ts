import { ILexTalkConfig } from '../../core/data/lex-talk-config.interface';
import { ResolveFunction } from '../../core/types';
import { checkAuth } from '../../midlewares/check-auth';
import { LexTalkConfigService } from '../../services/lex-talk-config.service';

type UpdateConfigResolve = ResolveFunction<ILexTalkConfig, ILexTalkConfig>;

export const updateConfig: UpdateConfigResolve = async (_parent, data, { req }) => {
  const user = checkAuth(req);
  return await LexTalkConfigService.updateConfig(user.id, data);
};

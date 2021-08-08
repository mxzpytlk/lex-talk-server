import { IConnection } from '../../core/data/connection';
import { ILexTalkConfig } from '../../core/data/lex-talk-config.interface';
import { ResolveFunction } from '../../core/types';
import { checkAuth } from '../../midlewares/check-auth';
import { LexTalkConfigService } from '../../services/lex-talk-config.service';

type ConfigResolve = ResolveFunction<null, ILexTalkConfig>;

export const getConfig: ConfigResolve = async (_parent, _, { req }) => {
  const user = checkAuth(req);
  return LexTalkConfigService.getConfig(user.id);
};

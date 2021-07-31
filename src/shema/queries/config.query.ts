import { GraphQLFieldConfig } from 'graphql';
import { IConnection } from '../../core/data/connection';
import { checkAuth } from '../../midlewares/check-auth';
import { LexTalkConfigService } from '../../services/lex-talk-config.service';
import { LexTalkConfigType } from '../types/lex-talk-config.type';

export const getConfig: GraphQLFieldConfig<null, IConnection> = {
  type: LexTalkConfigType,
  async resolve(_parent, _, { req }) {
    const user = checkAuth(req);
    return await LexTalkConfigService.getConfig(user.id);
  },
};

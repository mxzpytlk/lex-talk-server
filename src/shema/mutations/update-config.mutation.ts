import { GraphQLBoolean, GraphQLFieldConfig, GraphQLString } from 'graphql';
import { IConnection } from '../../core/data/connection';
import { ILexTalkConfig } from '../../core/data/lex-talk-config.interface';
import { checkAuth } from '../../midlewares/check-auth';
import { LexTalkConfigService } from '../../services/lex-talk-config.service';
import { LexTalkConfigType } from '../types/lex-talk-config.type';

export const updateConfig: GraphQLFieldConfig<null, IConnection, ILexTalkConfig> = {
  type: LexTalkConfigType,
  args: {
    lang: { type: GraphQLString },
    darkMode: { type: GraphQLBoolean }
  },
  async resolve(_parent, data, { req }) {
    const user = checkAuth(req);
    return await LexTalkConfigService.updateConfig(user.id, data);
  },
};
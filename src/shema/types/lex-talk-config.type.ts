import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';
import { ILexTalkConfig } from '../../core/data/lex-talk-config.interface';

export const LexTalkConfigType = new GraphQLObjectType<ILexTalkConfig, ILexTalkConfig>({
  name: 'LexTalkConfig',
  fields: () => ({
    lang: { type: GraphQLString },
    darkMode: { type: GraphQLBoolean }
  }),
});
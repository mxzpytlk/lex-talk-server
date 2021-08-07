import { GraphQLFieldConfig, GraphQLString } from 'graphql';
import { IConnection } from '../../core/data/connection';
import { checkAuth } from '../../midlewares/check-auth';
import { MessageService } from '../../services/message.service';
import { ContactType } from '../types/contact.type';

export const addContact: GraphQLFieldConfig<null, IConnection, { name: string }> = {
  type: ContactType,
  args: {
    name: { type: GraphQLString },
  },
  async resolve(_parent, { name }, { req }) {
    const user = checkAuth(req);
    return MessageService.addContact(user.id, name);
  },
};

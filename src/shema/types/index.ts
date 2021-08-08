import { importSchema } from 'graphql-import';

const typesPath = [
  'lex-talk-config.graphql',
  'user.graphql',
  'register.graphql',
  'contact.graphql',
  'query.graphql',
  'mutation.graphql'
];

function getPath(path: string) {
  return `src/shema/types/${path}`;
}

export const typeDefs = typesPath.map((path) => importSchema(getPath(path)));

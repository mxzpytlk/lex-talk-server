import { GraphQLError, GraphQLFormattedError } from 'graphql';

export function handleGraphQLErrorFn(error: GraphQLError): GraphQLFormattedError {
  const { message, path } = error;
  const extensions = {
    code: error.extensions.code
  };
  return { message, path, extensions };
}

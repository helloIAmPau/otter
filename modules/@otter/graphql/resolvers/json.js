import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';

export default new GraphQLScalarType({
  name: 'JSON',
  description: 'Custom JSON scalar.',
  serialize: function(value) {
    return JSON.stringify(value);
  },
  parseValue: function(value) {
    return JSON.parse(value);
  },
  parseLiteral(ast) {
    if(ast.kind === Kind.STRING) {
      throw new GraphQLError(`JSON must be a parsable JSON String. Received ${ ast.kind }`);
    }

    return JSON.parse(ast.value);
  }
});

import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';

export default new GraphQLScalarType({
  name: 'DateTime',
  description: 'Custom DateTime scalar. We convert a plain JS DateTime and a Clickhouse DateTime string to a ISOString date type',
  serialize: function(value) {
    if(typeof(value) === 'string') {
      return value;
    }

    return value.toISOString();
  },
  parseValue: function(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if(ast.kind === Kind.STRING) {
      throw new GraphQLError(`DateTime must be a String. Received ${ ast.kind }`);
    }

    return new Date(ast.value);
  }
});

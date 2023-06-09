const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const typeDefs = gql`
  type User {
    name: String
    email: String
  }

  type Query {
    getUser: User
  }
`;

const resolvers = {
  Query: {
    getUser: (parent, args, context) => {
      const authHeaders = context.headers.authorization || "";
      const token = authHeaders.replace("Bearer ", "");
      try {
        if (!token) {
          return "Authorization token is missing!";
        }
        console.log("in custom resolver");
        return "hello from custom resolver";
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  }
};

const context = ({ req }) => {
  return { headers: req.headers };
};

const schema = new ApolloServer({ typeDefs, resolvers, context });
schema.listen({ port: 5200 }).then(({ url }) => {
  console.log(`schema ready at ${url}`);
});

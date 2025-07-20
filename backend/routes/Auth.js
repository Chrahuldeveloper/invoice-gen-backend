const { makeExecutableSchema } = require("@graphql-tools/schema");
const db = require("../db/dbConfig");
const jwt = require("jsonwebtoken");

const typeDefs = `

  type Query  {
  hello : String
  }

  type Mutation {
    login(username: String!, password: String!): String
    SignUp(
            Name: String!
            email: String!
            Phone: String!
            username: String!
            password: String!
        ):String
        
  }



`;

const resolvers = {
  Query: {
    hello: () => "Welcome!",
  },

  Mutation: {
    login: async (_, { username, password }) => {
      try {
        const res = db.query("SELECT * FROM users WHERE username = $1", [
          username,
        ]);

        const user = await res.rows[0];

        if (!user) {
          throw new Error("User not found");
        }

        if (user.password != password) {
          throw new Error("invalid password");
        }

        const token = jwt.sign({ password: password }, username);

        return token.toString();
      } catch (err) {
        throw new Error(err.message);
      }
    },

    SignUp: async (_, { Name, email, Phone, username, password }) => {
      try {
        await db.query(
          "INSERT INTO users (name, email, phone, username, password) VALUES ($1, $2, $3, $4, $5)",
          [Name, email, Phone, username, password]
        );
        const token = jwt.sign({ password: password }, username);
        return token.toString();
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });

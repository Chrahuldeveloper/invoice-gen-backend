const { makeExecutableSchema } = require("@graphql-tools/schema");
const db = require("../db/dbConfig");

const typeDefs = `

  type Invoice {
    id: ID!
    amount: Float!
    date: String!
    customerName: String!
    user_id:String!
  }


  type Query  {
    getAllInvoice : [Invoice!]!

  }

  type Mutation {
      
    addInvoice(
         id: ID!
    amount: Float!
    date: String!
    customerName: String!
    user_id:String!
    ):Boolean
        
  }

`;

const resolvers = {
  Query: {
    getAllInvoice: async () => {
      try {
        const invoices = await db.query("SELECT * FROM invoices");
        return invoices.rows;
      } catch (error) {
        return [];
      }
    },
  },

  Mutation: {
    addInvoice: async (_, { id, amount, date, customerName, user_id }) => {
      try {
        await db.query(
          "INSERT INTO invoices (id, amount, date, customerName, user_id) VALUES ($1,$2,$3,$4,$5)",
          [id, amount, date, customerName, user_id]
        );

        return true;
      } catch (error) {
        return false;
      }
    },
  },
};

module.exports = makeExecutableSchema({ typeDefs, resolvers });

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const db = require("./db/dbConfig");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { graphqlHTTP } = require("express-graphql");
const generateGitFile = require("giv-gitignore");
const mergedSchema = require("./graphql/MergeSchema");
generateGitFile();

app.use("/graphql", (req, res, next) => {
  const invoiceId = req.query.invoiceId;
  graphqlHTTP({
    mergedSchema,
    graphiql: true,
    context: { invoiceId },
  });
});

const connectDb = async () => {
  try {
    await db.connect();
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
  connectDb();
});

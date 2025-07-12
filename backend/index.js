const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const generateGitFile = require("giv-gitignore");
generateGitFile();

app.get("/", (req, res) => {
  res.send("hello server");
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

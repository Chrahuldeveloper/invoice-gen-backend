const { Pool } = require("pg");

const db = new Pool({
  user: "my_db",
  host: "localhost",
  database: "invoice",
  password: "123",
  port: 5432,
});

module.exports = db;

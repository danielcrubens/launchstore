const { Pool } = require("pg");
module.exports = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: "5432",
  database: "lauchstoredb",
});

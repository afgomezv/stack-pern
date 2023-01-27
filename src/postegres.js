const { Pool } = require("pg");

const { db } = require("./config");

const pool = new Pool({
  user: db.user,
  password: "helloluna19",
  host: "localhost",
  port: 5432,
  database: "tasksdb",
});

module.exports = pool;

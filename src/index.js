const express = require("express");
const morgan = require("morgan");

const taskRoute = require("./routes/tasks.routes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(taskRoute);

app.listen(4000, () => {
  console.log("server en port 4000");
});

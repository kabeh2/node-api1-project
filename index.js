// implement your API here
const debug = require("debug")("app:dev");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("./middleware/logger");
const users = require("./routes/users");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(cors());

if (app.get("env") === "development") {
  debug("Morgan Logging enabled...");
  app.use(logger);
}
// Morgan Logging in Development only
// if (app.get("env") === "development") {
//   debug("Morgan Logging enabled...");
//   app.use(morgan("tiny"));
// }

// Routes
app.use("/api/users", users);

const port = process.env.PORT || 3001;
app.listen(port, () => debug(`Listening on port ${port}...`));

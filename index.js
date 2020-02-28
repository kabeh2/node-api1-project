// implement your API here
const debug = require("debug")("app:dev");
const morgan = require("morgan");
const helmet = require("helmet");
const users = require("./routes/users");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

// Morgan Logging in Development only
if (app.get("env") === "development") {
  debug("Morgan Logging enabled...");
  app.use(morgan("tiny"));
}

// Routes
app.use("/api/users", users);

const port = process.env.PORT || 3000;
app.listen(port, () => debug(`Listening on port ${port}...`));

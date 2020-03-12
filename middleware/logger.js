const morgan = require("morgan");
const debug = require("debug")("app:dev");
const express = require("express");
const app = express();

function logger(req, res, next) {
  try {
    if (app.get("env") === "development") {
      //   debug("Morgan Logging enabled...");
      let externalMiddlware = morgan("tiny");
      return externalMiddlware(req, res, next);
    } else {
      return next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = logger;

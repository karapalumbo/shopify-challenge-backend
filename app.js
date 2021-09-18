"use strict";

/** Express app for shopify */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const imageRoutes = require("./routes/images");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/", imageRoutes);
// app.use("/images", imageRoutes);
// app.use("/image", imageRoutes);

/** Handle 404 errors */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;

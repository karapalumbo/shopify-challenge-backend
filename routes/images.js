"use strict";

/** Routes for images. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const Image = require("../models/image");
const multer = require("multer");
const path = require("path");

const router = express.Router({ mergeParams: true });

const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images/");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf + "_" + file.originalname);
    },
  }),
});

/** GET /images =>
 *   { images: [ { id, filename, filepath, mimetype, size, description, price }, ...] }
 *
 */

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/images", async function (req, res, next) {
  const q = req.query;
  const dirName = path.resolve();
  const fullFilepath = path.join(dirName, "images/" + q.filename);
  const images = await Image.findAll(fullFilepath);
  return res.send({ images });
});

router.post("/image", imageUpload.single("image"), async function (req, res) {
  const q = req.query;

  // console.log("FILE", req.file);

  const image = await Image.add(q);
  res.json({ image });
});

module.exports = router;

"use strict";

/** Routes for images. */

const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../db");

const router = express.Router({ mergeParams: true });

const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images/");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + "_" + file.originalname);
    },
  }),
});

/** GET /images =>
 *   { images: [ { id, filename, filepath, mimetype, size }, ...] }
 *
 */

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/images", async function (req, res) {
  const q = req.query;

  let sqlQuery = `SELECT id,
                      filename,
                      filepath,
                      mimetype,
                      size
               FROM images
               ORDER BY filename`;

  await db
    .query(sqlQuery)
    .then((images) => {
      const imagesData = images.rows;
      let imageFiles = [];

      imagesData.map((image) => {
        const dirName = path.resolve();
        const fullFilepath = path.join(dirName, "images/" + image.filename);
        imageFiles.push(fullFilepath);
      });
      return res.send({ imageFiles });
    })
    .catch((err) =>
      res.status(404).json({
        success: false,
        message: "not found",
        stack: err.stack,
      })
    );
});

router.post(
  "/image",
  imageUpload.single("image"),
  async function (req, res, next) {
    const { filename, mimetype, size } = req.file;
    const filepath = req.file.path;

    let sqlQuery = `INSERT INTO images (
                      filename,
                      filepath,
                      mimetype,
                      size )
                  VALUES ('${filename}',
                          '${filepath}',
                          '${mimetype}',
                          '${size}')`;
    const file = req.file;
    await db
      .query(sqlQuery)
      .then(() => res.send({ success: true, file }))
      .catch((err) =>
        res.json({
          success: false,
          message: "upload failed",
          stack: err.stack,
        })
      );
  }
);

module.exports = router;

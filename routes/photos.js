"use strict";

/** Routes for photos. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const Photo = require("../models/photo");
const photoSearchSchema = require("../schemas/photoSearch.json");

const router = express.Router({ mergeParams: true });

/** GET / =>
 *   { photos: [ { id, name, description, image, price }, ...] }
 *
 * Can provide search filter in query:
 * - name
 * - animals
 * - plants
 * - color
 */

router.get("/", async function (req, res, next) {
  const q = req.query;

  try {
    const validator = jsonschema.validate(q, photoSearchSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const photos = await Photo.findAll(q);
    return res.json({ photos });
  } catch (err) {
    return next(err);
  }
});

/** GET /[id] => { photo }
 *
 * Returns { id, name, description, image, price }
 *
 */

router.get("/:id", async function (req, res, next) {
  try {
    const photo = await Photo.get(req.params.id);
    return res.json({ photo });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

class Image {
  /** Find all images
   *
   * Returns [{ id, filename, filepath, mimetype, size, description, price }, ...]
   * */

  static async findAll() {
    let query = `SELECT id,
                        filename,
                        filepath,
                        mimetype,
                        size,
                        description,
                        price
                 FROM images
                 ORDER BY filename`;

    const imageRes = await db.query(query);
    console.log(imageRes.rows);
    return imageRes.rows;
    // .then((images) => {
    // if (images[0]) {
    //   const dirName = path.resolve();
    //   const fullFilepath = path.join(dirName, images[0].imageRes.filepath);
    //   return res.type(images[0].mimetype).sendFile(fullFilepath);
    // }
    // });
    // .catch((err) =>
    //   res.status(404).json({
    //     success: false,
    //     message: "Not found",
    //     stack: err.stack,
    //   })
    // );

    // return imageRes;
  }

  static async add() {
    const imageRes = await db.query(
      `INSERT INTO images
                id,
                filename,
                filepath,
                mimetype,
                size,
                description,
                price`
    );
  }
}

module.exports = Image;

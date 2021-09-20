// // "use strict";

// const db = require("../db");
// // const { NotFoundError } = require("../expressError");

// class Image {
//   /** Find all images
//    *
//    * Returns [{ id, filename, filepath, mimetype, size, description, price }, ...]
//    * */
//   static async findAll() {
//     let query = `SELECT id,
//                       filename,
//                       filepath,
//                       mimetype,
//                       size
//                FROM images
//                ORDER BY filename`;
//     const imageRes = await db.query(query);
//     console.log(imageRes.rows);
//     return imageRes.rows;
//   }
//   // static async add() {
//   //   const { filename, mimetype, size } = req.file;
//   //   const filepath = req.file.path;
//   //   let sqlQuery = `INSERT INTO images (
//   //                               filename,
//   //                               filepath,
//   //                               mimetype,
//   //                               size )
//   //                       VALUES ('${filename}',
//   //                               '${filepath}',
//   //                               '${mimetype}',
//   //                               '${size}')`;
//   //   return sqlQuery;
//   // }
// }

// // .then((images) => {
// // if (images[0]) {
// //   const dirName = path.resolve();
// //   const fullFilepath = path.join(dirName, images[0].imageRes.filepath);
// //   return res.type(images[0].mimetype).sendFile(fullFilepath);
// // }
// // });
// // .catch((err) =>
// //   res.status(404).json({
// //     success: false,
// //     message: "Not found",
// //     stack: err.stack,
// //   })
// // );

// // return imageRes.rows;
// // }

// module.exports = Image;

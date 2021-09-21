// "use strict";

// const db = require("../db");

// class Image {
//   static async getImages() {
//     const image = await db.query(
//       `SELECT id,
//             filename,
//             filepath,
//             mimetype,
//             size
//             FROM images
//         ORDER BY filename`
//     );

//     const i = image.rows[0];

//     if (!i) throw new NotFoundError(`No image found`);

//     return i;
//   }
// }

module.exports = Image;

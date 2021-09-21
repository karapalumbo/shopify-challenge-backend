const db = require("./db.js");

const testFilenames = [];

async function commonBeforeAll() {
  await db.query("DELETE FROM images");

  await db.query(
    `INSERT INTO images(id,
                      filename,
                      filepath,
                      mimetype,
                      size)
     VALUES (1, 'test1.jpg', 'images/test1.jpg', 'image/jpeg', '123'),
            (2, 'test2.jpg', 'images/test2.jpg', 'image/jpeg', '456')
     RETURNING filename`
  );
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testFilenames,
};

"use strict";

process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("./app");
const db = require("./db.js");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testFilenames,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** models */
/**************** GET */

describe("allFiles", function () {
  test("GET works", async function () {
    let sqlQuery = `SELECT id,
                      filename,
                      filepath,
                      mimetype,
                      size
               FROM images
               ORDER BY filename`;

    let resp = await db.query(sqlQuery);

    expect(resp.rows).toEqual([
      {
        id: 1,
        filename: "test1.jpg",
        filepath: "images/test1.jpg",
        mimetype: "image/jpeg",
        size: "123",
      },
      {
        id: 2,
        filename: "test2.jpg",
        filepath: "images/test2.jpg",
        mimetype: "image/jpeg",
        size: "456",
      },
    ]);
  });

  /**************** POST */

  test("POST works", async function () {
    let sqlQuery = `INSERT INTO images (
                            id,
                            filename,
                            filepath,
                            mimetype,
                            size )
                        VALUES ( 3,
                                'test3.jpg',
                                'images/test3.jpg',
                                'image/jpeg',
                                '678')
                                RETURNING id, filename, filepath, mimetype, size`;

    let resp = await db.query(sqlQuery);

    expect(resp.rows).toEqual([
      {
        id: 3,
        filename: "test3.jpg",
        filepath: "images/test3.jpg",
        mimetype: "image/jpeg",
        size: "678",
      },
    ]);
  });

  /**************** DELETE */

  test("DELETE works", async function () {
    let resp = await db.query(`DELETE FROM images WHERE filename = $1`, [
      "test3.jpg",
    ]);
    expect(resp.rows.length).toEqual(0);
  });
});

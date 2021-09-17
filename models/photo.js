"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

class Photo {
  /** Find all photos (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - name
   * - animals
   * - plants
   * - color
   *
   * Returns [{ id, name, description, image, price }, ...]
   * */

  static async findAll(searchQuery) {
    let query = `SELECT id,
                        name,
                        description,
                        image,
                        price
                 FROM photos`;
    let whereExpressions = [];
    let queryValues = [];

    const { name } = searchQuery;

    // For each possible search term, add to whereExpressions and
    // queryValues so we can generate the right SQL

    if (name !== undefined) {
      queryValues.push(`%${name}%`);
      whereExpressions.push(`name ILIKE $${queryValues.length}`);
      queryValues.push(`%${name}%`);
      whereExpressions.push(`animals ILIKE $${queryValues.length}`);
      queryValues.push(`%${name}%`);
      whereExpressions.push(`plants ILIKE $${queryValues.length}`);
      queryValues.push(`%${name}%`);
      whereExpressions.push(`color ILIKE $${queryValues.length}`);
      queryValues.push(`%${name}%`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" OR ");
    }

    // Finalize query and return results

    query += " ORDER BY name";
    const photoRes = await db.query(query, queryValues);

    return photoRes.rows;
  }

  /** Given a photo id, return data about photo.
   *
   * Returns { id, name, description, image, price }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const petRes = await db.query(
      `SELECT id,
              name, 
              description,
              image,
              price
        FROM photos
        WHERE id = $1`,
      [id]
    );

    const photo = photoRes.rows[0];

    if (!photo) throw new NotFoundError(`No photo: ${id}`);

    return photo;
  }
}

module.exports = Photo;

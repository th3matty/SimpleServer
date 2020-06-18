const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "myfirstdb.c9gucoa8qxsa.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "admin1234",
  database: "AWS_FINAL",
});

class ThingsDB {
  async getAllThings() {
    let conn;

    try {
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT * from things");

      return rows;
    } catch (err) {
      return -1;
    } finally {
      if (conn) {
        conn.end();
      }
    }
  }

  async getThing(id) {
    let conn;

    try {
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT * from things WHERE id = ?", [id]);

      if (rows.length) {
        return rows[0];
      } else {
        return [];
      }
    } catch (err) {
      return -1;
    } finally {
      if (conn) {
        conn.end();
      }
    }
  }

  async insertThing(name, description) {
    let conn;

    try {
      conn = await pool.getConnection();
      const result = await conn.query(
        "INSERT INTO things (name, description) VALUES(?, ?)",
        [name, description]
      );

      if (result.affectedRows == 1) {
        return {
          id: result.insertId,
          name: name,
          description: description,
        };
      } else {
        return 0;
      }
    } catch (err) {
      return -1;
    } finally {
      if (conn) {
        conn.end();
      }
    }
  }

  async updateThing(id, name, description) {
    let conn;

    try {
      conn = await pool.getConnection();
      const result = await conn.query(
        "UPDATE things SET name = ?, description = ? WHERE id = ?",
        [name, description, id]
      );

      if (result.affectedRows == 1) {
        return {
          id: id,
          name: name,
          description: description,
        };
      } else {
        return 0;
      }
    } catch (err) {
      return -1;
    } finally {
      if (conn) {
        conn.end();
      }
    }
  }

  async deleteThing(id) {
    let conn;

    try {
      conn = await pool.getConnection();
      const result = await conn.query("DELETE from things WHERE id = ?", [id]);

      return result.affectedRows;
    } catch (err) {
      return -1;
    } finally {
      if (conn) {
        conn.end();
      }
    }
  }
}

module.exports = new ThingsDB();

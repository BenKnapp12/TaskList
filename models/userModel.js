const db = require('../db/client');

module.exports = {
  createUser: async ({ username, passwordHash }) => {
    const result = await db.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *',
      [username, passwordHash]
    );
    return result.rows[0];
  },

  getUserByUsername: async (username) => {
    const result = await db.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    return result.rows[0];
  }
};

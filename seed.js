require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const seed = async () => {
  try {
    // Drop tables if they exist
    await pool.query(`DROP TABLE IF EXISTS tasks`);
    await pool.query(`DROP TABLE IF EXISTS users`);

    // Create users table
    await pool.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `);

    // Create tasks table
    await pool.query(`
      CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        done BOOLEAN NOT NULL DEFAULT FALSE,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Insert one user (replace with real bcrypt hash if needed)
    const demoHash = '$2b$10$examplehash12345678901234567890123456789012345678901234567890'; // placeholder
    await pool.query(
      `INSERT INTO users (username, password) VALUES ('demo', $1)`,
      [demoHash]
    );

    // Insert three tasks for user ID 1
    await pool.query(`
      INSERT INTO tasks (title, done, user_id)
      VALUES 
        ('Write schema.sql', false, 1),
        ('Build Express routes', false, 1),
        ('Test protected endpoints', true, 1)
    `);

    console.log('✅ Database seeded successfully');
  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    await pool.end();
  }
};

seed();

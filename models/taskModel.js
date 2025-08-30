const db = require('../db/client');

module.exports = {
  getAllTasks: async () => {
    const result = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
    return result.rows;
  },

  createTask: async ({ title, userId }) => {
    const result = await db.query(
      'INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *',
      [title, userId]
    );
    return result.rows[0];
  },

  updateTaskStatus: async (taskId, completed) => {
    const result = await db.query(
      'UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *',
      [completed, taskId]
    );
    return result.rows[0];
  },

  deleteTask: async (taskId) => {
    await db.query('DELETE FROM tasks WHERE id = $1', [taskId]);
  }
};

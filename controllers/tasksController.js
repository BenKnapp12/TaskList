const taskModel = require('../models/taskModel');

module.exports = {
  getAllTasks: async (req, res) => {
    try {
      const tasks = await taskModel.getAllTasks();
      res.json(tasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

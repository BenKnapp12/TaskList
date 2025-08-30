const express = require('express');
const app = express();
require('dotenv').config();

const usersRoutes = require('./Routes/users');
const tasksRoutes = require('./Routes/tasks');


app.use(express.json());
const tasksRouter = require('./Routes/tasks');
app.use('/api/tasks', tasksRouter);
app.use('/users', usersRoutes);
app.use('/tasks', tasksRoutes);

module.exports = app;

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TaskList_db',    
  password: 'Kevin123123@',   
  port: 5432,
});

module.exports = pool;

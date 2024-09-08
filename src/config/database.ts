const { Pool, PoolConfig  } = require('pg');

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gym',
  password: 'root',
  port: 5432,
}) as typeof PoolConfig



"use strict";
require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Your Neon connection string
});

async function query(query, ...params) {
  try {
    const client = await pool.connect();
    const result = await client.query(query, params);
    client.release();
    return result;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

module.exports = { query };
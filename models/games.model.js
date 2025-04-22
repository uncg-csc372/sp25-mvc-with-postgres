"use strict";
const db = require("./db-conn");

async function getAll() {
  let sql = "SELECT * FROM Games;";
  const data = await db.query(sql);
  return data.rows;
}

async function getAllByOneAttribute(attribute, value) {
  const validColumns = await getColumnNames();
  if (validColumns.includes(attribute)) {
    let sql = "SELECT * FROM Games WHERE " + attribute + " =$1 ;";
    const data = await db.query(sql, value);
    return data.rows;
  }
}

async function getOneById(id) {
  let sql = "SELECT * FROM Games WHERE id =$1 ;";
  const item = await db.query(sql, id);
  return item.rows[0];
}

async function deleteGame(id) {
  let sql = "DELETE FROM Games WHERE id =$1; ";
  const info = await db.query(sql, id);
  // console.log(info);
  return info;
}

async function createNew(params) {
  let sql = "INSERT INTO Games " +
    "(name, platform, release_year, genre, publisher, developer, rating) " +
    "VALUES($1, $2, $3, $4, $5, $6, $7) ";
  const info = await db.query(sql, params[0], params[1], params[2], params[3], params[4], params[5], params[6]);
 // console.log(info);
  return info;
}

async function getColumnNames() {
  let sql = "SELECT column_name FROM information_schema.columns WHERE table_name = 'games'; "

  const columns = await db.query(sql);
  let result = columns.rows.map(a => a.column_name);
  return result;
}

module.exports = {
  getAll,
  getAllByOneAttribute,
  getOneById,
  deleteGame,
  createNew
};

"use strict";
const model = require("../models/games.model");

async function getAll(req, res, next) {
  try {
    let gamesList = await model.getAll();
    res.render("games", { gamesList: gamesList, title: "All Games" });
  } catch (err) {
    console.error("Error while getting games ", err.message);
    next(err);
  }
}

async function getAllByOneAttribute(req, res, next) {
  let attribute = req.query.attribute;
  let value = req.query.value;
  if (attribute && value) {
    try {
      let gamesList = await model.getAllByOneAttribute(attribute, value);
      res.render("games", { gamesList: gamesList, title: value + " Games" });
    } catch (err) {
      console.error("Error while getting games: ", err.message);
      next(err);
    }
  }
  else {
    res.status(400).send("Invalid Request");
  }
}

async function getOneById(req, res, next) {
  try {
    let game = await model.getOneById(req.params.id);
    res.render("game-details", { game: game, title: 'Game  #' + req.params.id });
  } catch (err) {
    console.error("Error while getting games: ", err.message);
    next(err);
  }
}

async function deleteGame(req, res, next) {
  try {
    let count = await model.deleteGame(req.params.id);
   // console.log(count.rowCount)
    let gamesList = await model.getAll();
    res.render("games", { gamesList: gamesList, title: "All Games" });
  } catch (err) {
    console.error("Error while getting games: ", err.message);
    next(err);
  }
}

async function createNew(req, res, next) {
  let name = req.body.name;
  let platform = req.body.platform;
  let release_year = parseInt(req.body.release_year);
  let genre = req.body.genre;
  let publisher = req.body.publisher;
  let developer = req.body.developer;
  let rating = req.body.rating;

  if (name && platform && release_year && genre && publisher && developer && rating) {
    let params = [name, platform, release_year, genre, publisher, developer, rating];
    try {
      //console.log("Creating new game with params: ", params);
      let count = await model.createNew(params);
      //console.log(count.rowCount)
      let gamesList = await model.getAll();
      res.render("games", { gamesList: gamesList, title: "All Games" });
    } catch (err) {
      console.error("Error while creating game: ", err.message);
      next(err);
    }
  }
  else {
    res.status(400).send("Invalid Request");
  }
}

module.exports = {
  getAll,
  getAllByOneAttribute,
  getOneById,
  deleteGame,
  createNew
};

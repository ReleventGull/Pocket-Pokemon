const express = require("express");
const { getAllPokemon, getPokemonById } = require("../db/");
const pokeRouter = express.Router();

pokeRouter.get((req, res, next) => {
  console.log("A request is being made to api/pokemon");
  next();
});

pokeRouter.get("/", async (req, res, next) => {
  try {
    const pokemon = await getAllPokemon();
    res.send(pokemon);
  } catch (error) {
    console.log("There was an error getting the pokemon");
    throw error;
  }
});

pokeRouter.get("/:pokeId", async (req, res, next) => {
  try {
    const { pokeId } = req.params;
    const pokemon = await getPokemonById(pokeId);
    res.send(pokemon);
  } catch (error) {
    next(error);
  }
});

pokeRouter.get("/:");

module.exports = pokeRouter;

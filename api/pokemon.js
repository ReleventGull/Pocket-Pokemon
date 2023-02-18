const express = require("express");
const pokeRouter = express.Router();
const {getExperienceRate} = require('../db/experince_rate')
const {createPokemon, getAllPokemon, getStarters} = require('../db/pokemon')
const {createPokemonStats} = require('../db/stats')

pokeRouter.get('/starters', async(req, res, next) => {
  try {
   let starters =  await getStarters()
   res.send(starters)
  }catch(error) {
    console.error("there was an error getting the pokemon starts", error)
    throw error
  }
})

pokeRouter.get('/', async(req, res, next) => {
    try {
      const allPokemon = await getAllPokemon()
      let sortedPokemon = allPokemon.sort((a,b) => a.id-b.id)
      res.send(allPokemon)
    }catch(error){
      console.error("There was an erroring fetching all the pokemon", error)
      throw error
    }
})
pokeRouter.post('/', async(req, res, next) => {
  try {
    const {name, type1, type2 = null, base_experience, catch_rate, legendary, mythical, experience_rate, stats} = req.body
    const experienceRate = await getExperienceRate(experience_rate)
    let pokemon = await createPokemon({
      name: name,
      type1: type1,
      type2: type2,
      catchRate: catch_rate,
      isLegendary: legendary,
      isMythical: mythical,
      baseExperience: base_experience,
      experience_rate: experienceRate.id
    })
    for(let i = 0; i < stats.length; i++) {
      await createPokemonStats({name: stats[i].stat.name, value: stats[i].base_stat, effort: stats[i].effort, pokemon_id: pokemon.id})
    }
    res.send({message: "Complete!"})
  }catch(error) {
    console.error("There was an error posting to the pokemon", error)
    throw error
  }
})




module.exports = pokeRouter;

const express = require("express");
const pokeRouter = express.Router();
const {getExperienceRate} = require('../db/experince_rate')
const {createPokemon, getAllPokemon} = require('../db/pokemon')
pokeRouter.get('/', async(req, res, next) => {
    try {
      const allPokemon = await getAllPokemon()
      console.log('All Pokemon Here', allPokemon)
      res.send({message:"Success"})
    }catch(error){
      console.error("There was an erroring fetching all the pokemon", error)
      throw error
    }
})
pokeRouter.post('/', async(req, res, next) => {
  try {
    const {name, type1, type2 = null, base_experience, catch_rate, legendary, mythical, experience_rate} = req.body
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
    res.send({message: "Incomplete"})
  }catch(error) {
    console.error("There was an error posting to the pokemon", error)
    throw error
  }
})


module.exports = pokeRouter;

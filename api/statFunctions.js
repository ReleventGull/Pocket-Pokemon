const {getMovesByPokemon} = require('../db/moves')
 
function generateIvs(pokemon) {
  for(let key in pokemon.stats) {
    let randomIV = Math.floor(Math.random() * 31)
    pokemon.stats[key]['individual'] = randomIV
  }
      return pokemon
  }
  
  
 function generateHP(pokemon, level) {
      const hp = Math.floor((((2 * pokemon.stats.hp.base_stat + pokemon.stats.hp.individual + (pokemon.stats.hp.effort/4)) * level)/100) + level + 10)
      pokemon.stats.hp.value = hp
      pokemon.stats.hp.current_value = hp
      delete pokemon.stats.hp.base_stat
      return pokemon
  }
  
 function generateStats(pokemon, level) {
    for(let key in pokemon.stats) {
      if (key == 'hp') {
        continue
      }
      const stat = Math.floor(((((2 * pokemon.stats[key].base_stat + pokemon.stats[key].individual + (pokemon.stats[key].effort/4)) * level)/100) + 5))
      pokemon.stats[key].value = stat
      pokemon.stats[key].current_value = stat
      delete pokemon.stats[key].base_stat
    }
    return pokemon
  }
  
  async function generateRandomMoves (pokemon)  {
      let moves =  await getMovesByPokemon(pokemon.name)
      for(let i = 1; i < 4; i++) {
        let randomMove = moves[Math.floor(Math.random() * moves.length)]
        pokemon.moves.push(randomMove)
      }
      return pokemon
  }
  
  module.exports = {
    generateHP,
    generateIvs,
    generateStats,
    generateRandomMoves
  }
  
  
  

  
  
  
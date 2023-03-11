const {getMovesByPokemon} = require('../db/moves')
 
function generateIvs(pokemon) {
  for(let key in pokemon.stats) {
    let randomIV = Math.floor(Math.random() * 31)
    pokemon.stats[key]['individual'] = randomIV
  }
      return pokemon
  }
  
  
 function generateHP(pokemon) {
      const hp = Math.floor((((2 * pokemon.stats.hp.value + pokemon.stats.hp.individual + (pokemon.stats.hp.effort/4)) * pokemon.level)/100) + pokemon.level + 10)
      pokemon.stats.hp.value = hp
      pokemon.stats.hp.current_value = hp

      return pokemon
  }
  
 function generateStats(pokemon) {
    for(let key in pokemon.stats) {
      if (key == 'hp') {
        continue
      }
      const stat = Math.floor(((((2 * pokemon.stats[key].value + pokemon.stats[key].individual + (pokemon.stats[key].effort/4)) * pokemon.level)/100) + 5))
      pokemon.stats[key].value = stat
      pokemon.stats[key].current_value = stat
     
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
  
  
  

  
  
  
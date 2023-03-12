const {getMovesByPokemon} = require('../db/moves')
 
function generateIvs(stats) {
  for(let key in stats) {
    let randomIV = Math.floor(Math.random() * 31)
    stats[key]['individual'] = randomIV
  }
      return stats
  }
  
  
 function generateHP(stats, level) {
      const hp = Math.floor((((2 * stats.hp.base_stat + stats.hp.individual + (stats.hp.effort/4)) * level)/100) + level + 10)
      stats.hp.value = hp
      stats.hp.current_value = hp
      delete stats.hp.base_stat
      return stats
  }
  
 function generateStats(stats, level) {
    for(let key in stats) {
      if (key == 'hp') {
        continue
      }
      const stat = Math.floor(((((2 * stats[key].base_stat + stats[key].individual + (stats[key].effort/4)) * level)/100) + 5))
      stats[key].value = stat
      stats[key].current_value = stat
      delete stats[key].base_stat
    }
    return stats
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
  
  
  

  
  
  
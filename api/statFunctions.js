
 function generateIvs(pokemon) {
  for(let key in pokemon.stats) {
    let randomIV = Math.floor(Math.random() * 31)
    pokemon.stats[key]['individual'] = randomIV
  }
      return pokemon
  }
  
  
 function generateHP(pokemon) {
      const hp = Math.floor((((2 * pokemon.stats.hp.value + pokemon.stats.hp.individual + (pokemon.stats.hp.effort/4)) * pokemon.level)/100) + pokemon.level + 10)
      console.log('Health', hp)
      pokemon.stats.hp.value = hp
      pokemon.stats.hp.current_value = hp
      return pokemon
  }
  
 function generateStats(pokemon) {
    for(let key in pokemon.stats) {
      if (key == 'hp') {
        console.log("Skip HP")
        continue
      }
      const stat = Math.floor(((((2 * pokemon.stats[key].value + pokemon.stats[key].individual + (pokemon.stats[key].effort/4)) * pokemon.level)/100) + 5))
      pokemon.stats[key].value = stat
      pokemon.stats[key].current_value = stat
     
    }
    return pokemon
  }
  
  module.exports = {
    generateHP,
    generateIvs,
    generateStats
  }
  
  
  
  //function experienceGained () {
  //  A=1 (If pokemon is wild)
  //  B = Base exp yield from the enemy pokemon
  //  E = 1.5 if the winning pokemon is holding a Lucky Egg (If not , 1)
  //  L = is the level of the fainted/caughtGen VI+ Pokémon
  //  S = If no Pokémon in the party is holding an Exp. Share...
  //  The number of Pokémon that participated in the battle and have not fainted
  //  If at least one Pokémon in the party is holding an Exp. Share...
  //  Twice the number of Pokémon that participated and have not fainted, when calculating the experience of a Pokémon that participated in battle
  //  Twice the number of Pokémon holding an Exp. Share, when calculating the experience of a Pokémon holding Exp. Share
  //const result = (((b * l)/7) * (1/s) * e *a)
  //}
  
  
  
  
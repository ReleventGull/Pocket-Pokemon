

export function generateIvs(pokemon) {
  for(let i = 0; i < 6; i++) {
      let randomIV = Math.floor(Math.random() * 31)
      pokemon.stats[i]['individual'] = randomIV
    }
    return pokemon
}


export function generateHP(pokemon) {
    console.log("THE POKEMON", pokemon)
    const hp = Math.floor((((2 * pokemon.stats[0].base_stat + pokemon.stats[0].individual + (pokemon.stats[0].effort/4)) * pokemon.current_level)/100) + pokemon.current_level + 10)
    console.log("The result", hp) 
    pokemon['current_stats'] = []
    pokemon.current_stats.push({hp: hp})
    return pokemon
}

export function generateStats(pokemon) {
  console.log("The pokemon being passed in", pokemon)
  for(let i = 1; i < 6; i++) {
    let objectToPush = {}
    const stat = ((((2 * pokemon.stats[i].base_stat + pokemon.stats[i].individual + (pokemon.stats[i].effort/4)) * pokemon.current_level)/100) + 5)
    let currentName = pokemon.stats[i].stat.name
    objectToPush[currentName] = stat
    pokemon.current_stats.push(objectToPush)
   
  }
  return pokemon
  
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





const typeTable =  {
      bug: {
        bug: 1,
        dark: 1,
        dragon: 1,
        electric: 1,
        fairy: 1,
        fighting: 0.5,
        fire: 2,
        flying: 2,
        ghost: 1,
        grass: 0.5,
        ground: 0.5,
        ice: 1,
        normal: 1,
        poison: 1,
        psychic: 1,
        rock: 2,
        steel: 1,
        water: 1
      },
      dark: {
        bug: 2,
        dark: 0.5,
        dragon: 1,
        electric: 1,
        fairy: 2,
        fighting: 2,
        fire: 1,
        flying: 1,
        ghost: 0.5,
        grass: 1,
        ground: 1,
        ice: 1,
        normal: 1,
        poison: 1,
        psychic: 0,
        rock: 1,
        steel: 1,
        water: 1
      },
      dragon: {
        bug: 1,
        dark: 1,
        dragon: 2,
        electric: 0.5,
        fairy: 2,
        fighting: 1,
        fire: 0.5,
        flying: 1,
        ghost: 1,
        grass: 0.5,
        ground: 1,
        ice: 2,
        normal: 1,
        poison: 1,
        psychic: 1,
        rock: 1,
        steel: 1,
        water: 0.5
      },
      electric: {
        bug: 1,
        dark: 1,
        dragon: 1,
        electric: 0.5,
        fairy: 1,
        fighting: 1,
        fire: 1,
        flying: 0.5,
        ghost: 1,
        grass: 1,
        ground: 2,
        ice: 1,
        normal: 1,
        poison: 1,
        psychic: 1,
        rock: 1,
        steel: 0.5,
        water: 1
      },
      fairy: {
        bug: 0.5,
        dark: 0.5,
        dragon: 0,
        electric: 1,
        fairy: 1,
        fighting: 0.5,
        fire: 1,
        flying: 1,
        ghost: 1,
        grass: 1,
        ground: 1,
        ice: 1,
        normal: 1,
        poison: 2,
        psychic: 1,
        rock: 1,
        steel: 2,
        water: 1
      },
      fighting: {
        bug: 0.5,
        dark: 0.5,
        dragon: 1,
        electric: 1,
        fairy: 2,
        fighting: 1,
        fire: 1,
        flying: 2,
        ghost: 1,
        grass: 1,
        ground: 1,
        ice: 1,
        normal: 1,
        poison: 1,
        psychic: 2,
        rock: 0.5,
        steel: 1,
        water: 1
      },
      fire: {
        bug: 0.5,
        dark: 1,
        dragon: 1,
        electric: 1,
        fairy: 0.5,
        fighting: 1,
        fire: 0.5,
        flying: 1,
        ghost: 1,
        grass: 0.5,
        ground: 2,
        ice: 0.5,
        normal: 1,
        poison: 1,
        psychic: 1,
        rock: 2,
        steel: 0.5,
        water: 2
      },
      flying: {
        bug: 0.5,
        dark: 1,
        dragon: 1,
        electric: 2,
        fairy: 1,
        fighting: 0.5,
        fire: 1,
        flying: 1,
        ghost: 1,
        grass: 0.5,
        ground: 0,
        ice: 2,
        normal: 1,
        poison: 1,
        psychic: 1,
        rock: 2,
        steel: 1,
        water: 1
      },
      ghost: {
        bug: 0.5,
        dark: 2,
        dragon: 1,
        electric: 1,
        fairy: 1,
        fighting: 0,
        fire: 1,
        flying: 1,
        ghost: 2,
        grass: 1,
        ground: 1,
        ice: 1,
        normal: 0,
        poison: 0.5,
        psychic: 1,
        rock: 1,
        steel: 1,
        water: 1
      },
      grass: {
        bug: 2,
        dark: 1,
        dragon: 1,
        electric: 0.5,
        fairy: 1,
        fighting: 1,
        fire: 2,
        flying: 2,
        ghost: 1,
        grass: 0.5,
        ground: 0.5,
        ice: 2,
        normal: 1,
        poison: 2,
        psychic: 1,
        rock: 1,
        steel: 1,
        water: 0.5
      },
      ground: {
        bug: 1,
        dark: 1,
        dragon: 1,
        electric: 0,
        fairy: 1,
        fighting: 1,
        fire: 1,
        flying: 1,
        ghost: 1,
        grass: 2,
        ground: 1,
        ice: 2,
        normal: 1,
        poison: 0.5,
        psychic: 1,
        rock: 0.5,
        steel: 1,
        water: 2
      },
      ice: {
        bug: 1,
        dark: 1,
        dragon: 1,
        electric: 1,
        fairy: 1,
        fighting: 2,
        fire: 2,
        flying: 1,
        ghost: 1,
        grass: 1,
        ground: 1,
        ice: 0.5,
        normal: 1,
        poison: 1,
        psychic: 1,
        rock: 2,
        steel: 2,
        water: 1
      },
      normal: {
        bug: 1,
        dark: 1,
        dragon: 1,
        electric: 1,
        fairy: 1,
        fighting: 2,
        fire: 1,
        flying: 1,
        ghost: 0,
        grass: 1,
        ground: 1,
        ice: 1,
        normal: 1,
        poison: 1,
        psychic: 1,
        rock: 1,
        steel: 1,
        water: 1
      },
      poison: {
        bug: 0.5,
        dark: 1,
        dragon: 1,
        electric: 1,
        fairy: 0.5,
        fighting: 0.5,
        fire: 1,
        flying: 1,
        ghost: 1,
        grass: 0.5,
        ground: 2,
        ice: 1,
        normal: 1,
        poison: 0.5,
        psychic: 2,
        rock: 1,
        steel: 1,
        water: 1
      },
      psychic: {
        bug: 2,
        dark: 2,
        dragon: 1,
        electric: 1,
        fairy: 1,
        fighting: 0.5,
        fire: 1,
        flying: 1,
        ghost: 2,
        grass: 1,
        ground: 1,
        ice: 1,
        normal: 1,
        poison: 1,
        psychic: 0.5,
        rock: 1,
        steel: 1,
        water: 1
      },
      rock: {
        bug: 1,
        dark: 1,
        dragon: 1,
        electric: 1,
        fairy: 1,
        fighting: 2,
        fire: 0.5,
        flying: 0.5,
        ghost: 1,
        grass: 2,
        ground: 2,
        ice: 1,
        normal: 0.5,
        poison: 0.5,
        psychic: 1,
        rock: 1,
        steel: 2,
        water: 2
      },
      steel: {
        bug: 0.5,
        dark: 1,
        dragon: 0.5,
        electric: 1,
        fairy: 0.5,
        fighting: 2,
        fire: 2,
        flying: 0.5,
        ghost: 1,
        grass: 0.5,
        ground: 2,
        ice: 0.5,
        normal: 0.5,
        poison: 0,
        psychic: 0.5,
        rock: 0.5,
        steel: 0.5,
        water: 1
      },
      water: {
        bug: 1,
        dark: 1,
        dragon: 1,
        electric: 2,
        fairy: 1,
        fighting: 1,
        fire: 0.5,
        flying: 1,
        ghost: 1,
        grass: 2,
        ground: 1,
        ice: 0.5,
        normal: 1,
        poison: 1,
        psychic: 1,
        rock: 1,
        steel: 0.5,
        water: 0.5
      }
    }


function damage ({attackingTypes, defendingTypes, pokemonAttacking, pokemondefending, move, critical}) {
  console.log(move)
  let Type1
  let Type2
  let a
  let d
  let STAB
  let random
  Type1 = typeTable[move.type][defendingTypes.type1]
  if (!defendingTypes.type2) {
    Type2 = 1
  }else {
    Type2 = typeTable[move.type][defendingTypes.type2]
  }
  if(move.type == attackingTypes.type1 || move.type == attackingTypes.type2) {
    STAB = 1.5
  }else {
    STAB = 1
  }
  if (move.category == 'physical') {
    a = pokemonAttacking.stats.attack.current_value
    d = pokemondefending.stats.defense.current_value
  }else {
    console.log(pokemonAttacking)
    a = pokemonAttacking.stats['special-attack'].current_value
    d = pokemondefending.stats['special-defense'].current_value
}

  let min = 217
  let max = 255
  let randomNum = Math.floor(Math.random() * (max - min + 1) + min)
  console.log(randomNum)
    // A is the effective Attack stat of the attacking pokémon if the used move is a 
    // physical move, or the effective special stat of the attacking pokémon if the used move is a special 
    // move (for a critical hit, all modifiers are ignored, and the unmodified Attack or 
    // special is used instead). if either this or D are greater than 255, both are divided by 4 and rounded down.
let damageDone = Math.floor(((((((2*pokemonAttacking.level*critical)/5)+2)* move.power * a/d)/50)+2) * STAB * Type1 * Type2 * (randomNum/255))

pokemondefending.stats.hp.current_value -= damageDone
console.log(damageDone)
return pokemondefending
}

module.exports = {
  typeTable,
  damage
}


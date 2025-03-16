

const EnemyPokemonComponent = ({pokemonEncountered}) => {
    return (
        <><div id="pokemonPlayerHealthContainer">
              <div id="pokemonHealthName">
                <p>{pokemonEncountered.name}</p>
                <p>{`Lv.${pokemonEncountered.level}`}</p>
              </div>

              <div id="pokemonHp">
                <span>HP</span>
                <progress
                  id="pokemonPlayerHealth"
                  value={pokemonEncountered.stats.hp.current_value}
                  max={pokemonEncountered.stats.hp.value}
                ></progress>
              </div>
              <p>
                {pokemonEncountered.stats.hp.current_value}/
                {pokemonEncountered.stats.hp.value}
              </p>
            </div>
            <p className={`pokemon Encountered ${pokemonEncountered.name}`} />
         </>
    )
}

export default EnemyPokemonComponent
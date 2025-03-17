

const UserPokemonComponent = ({pokemonParticpating}) => {
    return (
        <>
        <div className={`pokemonE forPlayer ${pokemonParticpating.name}`} src={pokemonParticpating}/>
            <div id="pokemonPlayerHealthContainer">
              <div id="pokemonHealthName">
                <p>{pokemonParticpating.name}</p>
                <p>Lv.{pokemonParticpating.level}</p>
              </div>

              <div id="pokemonHp">
                <span>HP</span>
                <progress
                  id="pokemonPlayerHealth"
                  value={pokemonParticpating.stats.hp.current_value}
                  max={pokemonParticpating.stats.hp.value}
                ></progress>
              </div>
              <p>
                {pokemonParticpating.stats.hp.current_value}/
                {pokemonParticpating.stats.hp.value}
              </p>
            </div>
        </>
    )
}

export default UserPokemonComponent
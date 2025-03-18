

const PokemonPartyItem = ({po, SwitchButton, switchPokemon}) => {
    return (
        <div className="pokemonBox">
                    <div className="imageLevelBox">
                     <div className={`playerParty ${po.name}`} />
                    </div>
                    <div className="nameHealthBox">
                        <h3>{po.name}</h3>
                        <div className="healthContainerParty">
                            <h3>HP</h3>
                            <progress
                            id="pokemonPlayerHealth"
                            value={po.stats.hp.current_value}
                            max={po.stats.hp.value}
                            ></progress>
                            <h3>{po.stats.hp.current_value}/{po.stats.hp.value}</h3>
                        </div>
                    </div>
                    <div className="thirdBox">
                        <h3>Lv. {po.level}</h3>
                    </div>
                    {SwitchButton ? <SwitchButton po={po} switchPokemon={switchPokemon}/> : null}
                  </div>  
    )
}
export default PokemonPartyItem
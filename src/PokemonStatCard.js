


const PokemonStatCard = ({selectedPokemon, setSelectedPokemon}) => {
    console.log(selectedPokemon)
    return (
        <div className="pokemonStatCardContainer">
            <div className="topStatCard">
                Stats
            </div>
            <div className="middleStatCard">
                
                <div className="pokemonStatImageContainer">
                    <div className="pokemonStateImageBox">
                        <div style={{padding: "1rem"}}>{selectedPokemon.name}</div>
                        <div>Lvl. {selectedPokemon.level}</div>
                        <div style={{height: "400px", width: "400px"}} className={`playerParty ${selectedPokemon.name}`}></div>
                    </div>
                </div>
                
                <div className="pokemonStatsContainer">
                    <div className="statGrid">
                        <div className="statCategoryNames">
                            <div style={{width: '10rem'}}></div>
                            <div>EV</div>
                            <div>IV</div>
                            <div>STAT</div>
                        </div>
                        
                        <div className="filler" />
                        
                        <div className="statCategoryNames">
                            <div style={{width: '10rem'}}>HP</div>
                            <div>EV</div>
                            <div>IV</div>
                            <div>{selectedPokemon.stats.hp.value}</div>
                        </div>

                        <div className="statCategoryNames">
                            <div style={{width: '10rem'}}>Attack</div>
                            <div>EV</div>
                            <div>IV</div>
                            <div>{selectedPokemon.stats.attack.value}</div>
                        </div>
                        
                        <div className="statCategoryNames">
                            <div style={{width: '10rem'}}>Defense</div>
                            <div>EV</div>
                            <div>IV</div>
                            <div>{selectedPokemon.stats.defense.value}</div>
                        </div>
                        <div className="statCategoryNames">
                            <div style={{width: '10rem'}}>Sp.Atk</div>
                            <div>EV</div>
                            <div>IV</div>
                            <div>{selectedPokemon.stats.attack.value}</div>
                        </div>
                        <div className="statCategoryNames">
                            <div style={{width: '10rem'}}>Sp.Def</div>
                            <div>EV</div>
                            <div>IV</div>
                            <div>{selectedPokemon.stats.defense.value}</div>
                        </div>
                        <div className="statCategoryNames">
                            <div style={{width: '10rem'}}>Speed</div>
                            <div>EV</div>
                            <div>IV</div>
                            <div>{selectedPokemon.stats.speed.value}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pokemonStatFooter">
                <button onClick={() => setSelectedPokemon(null)}>Exit</button>
            </div>
        </div>
    )
}

export default PokemonStatCard
import React, { useState, useEffect } from "react";
import wildbattle from "./audiofiles/wildbattle.mp3";
import {default as FightMoves} from './EncounterOptions/FightMoves'
import { default as FightOptions } from './EncounterOptions/FightOptions'
const Encounter = ({
  pokemonEncountered,
  setEncounter,
  playerPokemon,
  setPokemonEncounterd,
  encounter,
}) => {
  const [playerTurn, setPlayerTurn] = useState(1)
  const [view, setView] = useState('')



  
  return (
    pokemonEncountered  ?
    <div id="grid-encoutner">
      <div className="encounter-container">
        <div className="backgroundBattle">
          
          <div className="top one">
          <div id="pokemonPlayerHealthContainer">
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
          </div>

          <div /***************** PLAYER STATS START *****************/className="top two">
          <div className={`pokemonE forPlayer ${playerPokemon[0].name}`} src={playerPokemon}/>
            <div id="pokemonPlayerHealthContainer">
              <div id="pokemonHealthName">
                <p>{playerPokemon[0].name}</p>
                <p>Lv.{playerPokemon[0].level}</p>
              </div>

              <div id="pokemonHp">
                <span>HP</span>
                <progress
                  id="pokemonPlayerHealth"
                  value={playerPokemon[0].stats.hp.current_value}
                  max={playerPokemon[0].stats.hp.value}
                ></progress>
              </div>
              <p>
                {playerPokemon[0].stats.hp.current_value}/
                {playerPokemon[0].stats.hp.value}
              </p>
            </div>
          </div>
 
          
        </div>
        {view == '' ? <FightOptions setEncounter={setEncounter} setView={setView}/>: null}
        {view == 'fight' ? <FightMoves setEncounter={setEncounter} setPokemonEncounterd={setPokemonEncounterd} pokemonEncountered={pokemonEncountered} setView={setView} playerPokemon={playerPokemon}/>: null}
  


      </div>
    </div>
  :
  <h2>Loading</h2>
  )
};
export default Encounter;

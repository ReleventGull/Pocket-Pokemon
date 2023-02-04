import React, { useState, useEffect } from "react";
import wildbattle from "./audiofiles/wildbattle.mp3";
import {default as FightMoves} from './EncounterOptions/FightMoves'
import { default as FightOptions } from './EncounterOptions/FightOptions'
const Encounter = ({
  pokemonEncountered,
  setEncounter,
  playerPokemon,
  encounter,
}) => {
  const [playerTurn, setPlayerTurn] = useState(1)
  const [view, setView] = useState('')


console.log(pokemonEncountered)

  
  return (
    pokemonEncountered  ?
    <div id="grid-encoutner">
      <div className="encounter-container">
        <div className="backgroundBattle">
          
          <div className="top one">
          <div id="pokemonPlayerHealthContainer">
              <div id="pokemonHealthName">
                <p>{pokemonEncountered.name}</p>
                <p>{`Lv.${pokemonEncountered.current_level}`}</p>
              </div>

              <div id="pokemonHp">
                <span>HP</span>
                <progress
                  id="pokemonPlayerHealth"
                  value={pokemonEncountered.current_hp}
                  max={pokemonEncountered.current_stats[0]}
                ></progress>
              </div>
              <p>
                {pokemonEncountered.current_hp}/
                {pokemonEncountered.current_stats[0].hp}
              </p>
            </div>
            <p className={`pokemon Encountered ${pokemonEncountered.name}`} />
          </div>


 
          <div /***************** PLAYER STATS START *****************/className="top two">
          <div className={`pokemonE forPlayer ${playerPokemon.name}`} src={playerPokemon}/>
            <div id="pokemonPlayerHealthContainer">
              <div id="pokemonHealthName">
                <p>{playerPokemon.name}</p>
                <p>Lv.{playerPokemon.current_level}</p>
              </div>

              <div id="pokemonHp">
                <span>HP</span>
                <progress
                  id="pokemonPlayerHealth"
                  value={playerPokemon.current_hp}
                  max={playerPokemon.current_stats[0].hp}
                ></progress>
              </div>
              <p>
                {playerPokemon.current_hp}/
                {playerPokemon.current_stats[0].hp}
              </p>
            </div>
          </div>
        </div>
        {view == '' ? <FightOptions setEncounter={setEncounter} setView={setView}/>: null}
        {view == 'fight' ? <FightMoves setView={setView} playerPokemon={playerPokemon}/>: null}
  


      </div>
    </div>
  :
  <h2>Loading</h2>
  )
};
export default Encounter;

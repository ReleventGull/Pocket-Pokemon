import React, { useState, useEffect } from "react";
import wildbattle from "./audiofiles/wildbattle.mp3";

const Encounter = ({
  pokemonEncountered,
  setEncounter,
  playerPokemon,
  encounter,
}) => {
  let battleSong = new Audio(wildbattle);

  useEffect(() => {
    if (encounter == true) {
      console.log("Am I going");
      battleSong.currentTime = 0.4;
      battleSong.play();
    }
  }, [encounter]);

  return (
    <div id="grid-encoutner">
      <div className="encounter-container">
        <div className="backgroundBattle">
          
          <div className="top one">
          <div id="pokemonPlayerHealthContainer">
              <div id="pokemonHealthName">
                <p>{pokemonEncountered.name}</p>
                <p>Lv.42</p>
              </div>

              <div id="pokemonHp">
                <span>HP</span>
                <progress
                  id="pokemonPlayerHealth"
                  value={pokemonEncountered.stats[0].base_stat}
                  max={pokemonEncountered.stats[0].base_stat}
                ></progress>
              </div>
              <p>
                {pokemonEncountered.stats[0].base_stat}/
                {pokemonEncountered.stats[0].base_stat}
              </p>
            </div>
            <p className={`pokemon Encountered ${pokemonEncountered.name}`} />
          </div>

          <div className="top two">
          
             
              
          <div className={`pokemonE forPlayer ${playerPokemon.name}`} src={playerPokemon}/>
            <div id="pokemonPlayerHealthContainer">
              <div id="pokemonHealthName">
                <p>{playerPokemon.name}</p>
                <p>Lv.42</p>
              </div>

              <div id="pokemonHp">
                <span>HP</span>
                <progress
                  id="pokemonPlayerHealth"
                  value={playerPokemon.stats[0].base_stat}
                  max={playerPokemon.stats[0].base_stat}
                ></progress>
              </div>
              <p>
                {playerPokemon.stats[0].base_stat}/
                {playerPokemon.stats[0].base_stat}
              </p>
            </div>
          </div>
        </div>

          <div className="top three">
          <button className="button one">Bag</button>
          <button className="button two">Fight</button>
          <button className="button three">Pokemon</button>
          <button
            onClick={() => {
              setEncounter(false),
                battleSong.pause(),
                (battleSong.currentTime = 0);
            }}
            className="button four"
          >
            Run
          </button>
        </div>
      </div>
    </div>
  );
};
export default Encounter;

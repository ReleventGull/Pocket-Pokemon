import React, { useState } from "react";
import select from "./audiofiles/select.mp3";
import { generateStarter } from "./apiCalls";
const NameDisplay = ({starters, setplayerPokemon, setPlayerDefined, pokemonMoves}) => {
  const [userName, setUserName] = useState('')
  const [selectedStarter, setSelectedStarter] = useState([])
  let selectSound = new Audio(select)
  
  const handlePokemonSelect = async(event) => {
    const [filteredStarter] = starters.filter(starter => starter.name === event.target.id)
    filteredStarter['moves'] = []
    const scratch = pokemonMoves.find(move => move.name === 'scratch')
    filteredStarter.moves.push(scratch)
    const finishedStarter = await generateStarter(filteredStarter)
    setSelectedStarter(finishedStarter)
    selectSound.currentTime = 0.25
    selectSound.play()
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if (selectedStarter.length < 1) {
      console.log("you did not choose a starter")
      return
    }else if (!userName) {
      console.log("Please enter a username!")
    }else {
      setUserName(userName)
      setplayerPokemon(selectedStarter)
      setPlayerDefined(true)
    }
  }
  
  return (
    <>
      <form onSubmit={handleSubmit} id="playerStatus">
        <h3 id="playerName">Enter Name</h3>
        <input
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          id="nameInput"
          type="text"
        />
        <button type="submit" id="submitName">
          Submit!
        </button>
      </form>
    <div id='definePlayerPokemon'>
    <div className="starterPage">
    <h2>Choose your Starter!</h2>
      <div id='pokemonStarters'>
      {starters.map(starter => 
          <div className="starterContainers"> 
            <h2>{starter.name}</h2>
          <div  onClick={handlePokemonSelect} className={selectedStarter.name === starter.name ? `starterImage selected ${starter.name} ` : `starterImage ${starter.name}`}  id={starter.name}></div>
          <img  className='starterBall' src="https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png"/>
        </div>
       )}  
        </div>  
      </div>
    </div>
    </>
  
  );
};

export default NameDisplay;

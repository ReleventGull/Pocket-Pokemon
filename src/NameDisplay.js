import React, { useState, useEffect } from "react";

const NameDisplay = ({starters, setplayerPokemon, setPlayerDefined}) => {
  const [userName, setUserName] = useState('')
  const [selectedStarter, setSelectedStarter] = useState([])
  
  
  const handlePokemonSelect = (event) => {
    const [filteredStarter] = starters.filter(starter => starter.name === event.target.id)
    setSelectedStarter(filteredStarter)
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
          <div  onClick={handlePokemonSelect} className={`starterImage ${starter.name}`}  id={starter.name}></div>
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

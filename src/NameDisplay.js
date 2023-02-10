import React, { useEffect, useState } from "react";
import select from "./audiofiles/select.mp3";
import { fetchStarters } from "./apiCalls/index";
import { registerUser, checkUser } from "./apiCalls/users";
const NameDisplay = ({setplayerPokemon, setPlayerDefined, pokemonMoves}) => {
  
  const [starters, setStarters] = useState([])
  const [selectedStarter, setSelectedStarter] = useState()
  
  const [register, setRegister] = useState(false)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [errorMesage, setErrorMesage] = useState('')

  let selectSound = new Audio(select)
  
  const handlePokemonSelect = async(name) => {
    setSelectedStarter(name)
    selectSound.currentTime = 0.25
    selectSound.play()
  }
  const getStarters = async() => {
   let starters = await  fetchStarters()
   setStarters(starters)
  }
  
  const handleAccountConfirm = async() => {
    if (password !== password2) {
      setErrorMesage('Passwords do not match!')
    }else if (password.length < 5) {
      setErrorMesage('Password is too short!')
    }  else if (!password, !password2, !username, !name) {
      setErrorMesage('Not all fields have been filled!')
    }
    else {
      const existingUser = await checkUser({password: password, username: username, name:name})
      if (existingUser) {
        setErrorMesage('A user by that username already exists!')
      }else {
        setErrorMesage('')
        setRegister(true)
      }
    }
  }
  
  useEffect(() => {
    getStarters()
  }, [])



  
  return (
    <div id='definePlayerPokemon'>
    <div className="starterPage">
    <h2>Welcome!</h2>
      <form className='registerForm'>
        <label>Username</label>
        <input type='username' onChange={(event) => setUsername(event.target.value)}value={username} disabled={register ? true : false}></input>
        <label>Password</label>
        <input type='password' onChange={(event) => setPassword(event.target.value)} value={password} disabled={register ? true : false}></input>
        <label >Confirm Password</label>
        <input type='password' onChange={(event) => setPassword2(event.target.value)} value={password2} disabled={register ? true : false} ></input>
        <label>Nickname</label>
        <input type='username' onChange={(event) => setName(event.target.value)} value={name} disabled={register ? true : false}></input>
      </form>
      <h2>{errorMesage}</h2>
      {!register ? <button className='confirmRegister' onClick={() => handleAccountConfirm()}>Confirm!</button>: 
      <button onClick={() => {setSelectedStarter(null), setRegister(false)}}className="cancelButton">Cancel</button>
      }
      <div id='pokemonStarters'>
      {!starters ? null : starters.map(starter => 
          <div key={starter.id} className={`starterContainers ${register}`}> 
            <h2>{starter.name}</h2>
          <div  onClick={() => handlePokemonSelect(starter.id)} className={selectedStarter === starter.id ? `starterImage selected ${starter.name} ` : `starterImage ${starter.name}`}  id={starter.id}></div>
          <img  className='starterBall' src="https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png"/>
        </div>
       )}  
          </div>  
      </div>
    {selectedStarter  ? <button className='submitName'>Play!</button> : null}
  </div>

  
  );
};

export default NameDisplay;

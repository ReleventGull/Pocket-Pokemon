import React from "react";


const FightOptions = ({setView, setEncounter}) => {
    return (
    <div className="top three">
    <button className="button one">Bag</button>
          <button onClick={() => setView('fight')}className="button two">Fight</button>
          <button className="button three">Pokemon</button>
          <button
            onClick={() => {
                setEncounter(false)
            }}
            className="button four"
          >
            Run
          </button>
          </div>
          )
}

export default FightOptions
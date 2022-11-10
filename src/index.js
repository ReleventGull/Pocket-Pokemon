import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import { NameDisplay, GameBoard } from "./Exported";

const App = () => {
  const [player, setPlayer] = useState([1, 3]);
  const [playerDirection, setPlayerDirection] = useState('left')
  const [playerDefined, setPlayerDefined] = useState(true);
  const [encounterMessage, setencounterMessage] = useState("");

  
console.log(player)

  useEffect(() => {
    const handler = function keyPress(e) {
      const encounterChance = () => {
        let d = Math.random();
        console.log(d);
        if (d < 0.5) {
          setencounterMessage("Keep Looking!");
        } else if (d > 0.9) setencounterMessage("You found a pokemon!");
        else {
          setencounterMessage("Keep Looking!");
        }
      };
      if (playerDefined === true) {
        {
          if (e.keyCode === 40) {
            
            setPlayerDirection('down')
            setPlayer([player[0] + 1, player[1]]); // Going Down
          } else if (e.keyCode === 38) {
           
            setPlayerDirection('up')
            setPlayer([player[0] - 1, player[1]]); // Up Key
          } else if (e.keyCode === 37) {

            setPlayerDirection('left')
            setPlayer([player[0], player[1] - 1]); // Going Left
          } else if (e.keyCode === 39) {
            setPlayerDirection('right')
            setPlayer([player[0], player[1] + 1]); // Going Right
          }
        }
      } else {
        console.log("You're not logged in!");
      }
    };
    document.title = `FUCK YOU ${player}`
    document.addEventListener('keydown', handler) 
    return () =>  (document.removeEventListener('keydown', handler))
  })
 
  return (
    <main>
      <header>
        <h1 className="gameName">Pokemon!</h1>
      </header>
      {playerDefined ? (
        <>
          <div>{encounterMessage}</div>
          <GameBoard playerDirection={playerDirection} player={player} />
        </>
      ) : (
        <NameDisplay setPlayerDefined={setPlayerDefined} />
      )}
    </main>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);

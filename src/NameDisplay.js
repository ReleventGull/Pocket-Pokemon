import React, { useState } from "react";

const NameDisplay = ({setPlayerDefined}) => {
  const [userName, setUserName] = useState('');
    console.log(userName)
  const handleSubmit = (event) => {
    event.preventDefault();
    setPlayerDefined(true)
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="playerStatus">
        <h3 id="playerName">Enter Name </h3>
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
    </>
  );
};

export default NameDisplay;

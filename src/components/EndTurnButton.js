import React from 'react'

const EndTurnButton = ({FinishTurn}) => {

  const handleClick = () => {
      FinishTurn()
    }
  return (
      <button onClick={handleClick}>
      End turn
      </button>
  );
}

export default EndTurnButton
import React from 'react'

const EndTurnButton = ({events}) => {

  const handleClick = (e) => {
      e.preventDefault()
      // Need Logic Check HERE!
      events.endTurn()
    }
  return (
      <button onClick={handleClick}>
      End turn
      </button>
  );
}

export default EndTurnButton
import React from 'react'
import MainBoard from './components/MainBoard'
import Rack from './components/Rack'


const RummikubBoard = ({G, ctx, moves, events, playerID}) => {
  
  const isActive = (id) => {
    if (!isActive) return false;
    if (G.cells[id] !== null) return false;
    return true;
  }

  const onClick = (id) => {
    if (isActive(id)) {
      moves.ClickCell(id);
      events.endTurn();
    }
  }

  return (
    <div>
      <MainBoard {...{G, onClick}}/>
      <h5>Rack</h5>
      <Rack playerRack={G.players[playerID]}/>
    </div>
  )
}

export default RummikubBoard;
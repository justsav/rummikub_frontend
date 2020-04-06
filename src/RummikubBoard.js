import React from 'react'
import MainBoard from './components/MainBoard'
import Rack from './components/Rack'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'


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
    <DndProvider backend={Backend}>
      <div>
        <MainBoard {...{G, onClick, moveToBoard: moves.MoveToBoard}}/>
        <h5>Rack</h5>
        <Rack board={G.cells} playerRack={G.players[playerID]}/>
      </div>
    </DndProvider>
  )
}

export default RummikubBoard;
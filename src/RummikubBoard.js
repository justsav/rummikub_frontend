import React from 'react'
import MainBoard from './components/MainBoard'
import Rack from './components/Rack'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import PullTileButton from './components/PullTileButton'
import EndTurnButton from './components/EndTurnButton'

const RummikubBoard = ({G, ctx, moves, events, playerID, isActive}) => {
  return (
    <DndProvider backend={Backend}>
      <div>
        <h1>Player {playerID} {isActive && ' - YOUR TURN'}</h1>
        <MainBoard {...{G, MoveTile: moves.MoveTile}}/>
        <h5>Rack</h5>
        <Rack {...{playerRack: G.players[playerID], MoveTile: moves.MoveTile}}/>
        {isActive &&
          <React.Fragment>
            <PullTileButton {...{playerID, PullTile: moves.PullTile}}/>
            <EndTurnButton FinishTurn={moves.FinishTurn}/>
          </React.Fragment>
        }
        
      </div>
    </DndProvider>
  )
}

export default RummikubBoard;

import React from 'react'
import MainBoard from './components/MainBoard'
import Rack from './components/Rack'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import PullTileButton from './components/PullTileButton'
import EndTurnButton from './components/EndTurnButton'

const RummikubBoard = ({G, ctx, moves, events, playerID}) => {
  return (
    <DndProvider backend={Backend}>
      <div>
        <MainBoard {...{G, MoveTile: moves.MoveTile}}/>
        <h5>Rack</h5>
        <Rack {...{playerRack: G.players[playerID], MoveTile: moves.MoveTile}}/>
        <PullTileButton {...{G, playerID, events}}/>
        <EndTurnButton {...{events}}/>
      </div>
    </DndProvider>
  )
}

export default RummikubBoard;

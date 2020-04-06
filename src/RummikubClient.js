import { Client } from 'boardgame.io/react'
import { SocketIO, Local } from 'boardgame.io/multiplayer'  // eslint-disable-line
import Rummikub from './Rummikub'
import RummikubBoard from './RummikubBoard'

const RummikubClient = Client({
  game: Rummikub, 
  board: RummikubBoard,
  multiplayer: Local(),
  // debug: true
})

export default RummikubClient
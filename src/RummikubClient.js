import { Client } from 'boardgame.io/react'
import { SocketIO } from 'boardgame.io/multiplayer'
import Rummikub from './Rummikub'
import RummikubBoard from './RummikubBoard'

const RummikubClient = Client({
  game: Rummikub, 
  board: RummikubBoard,
  multiplayer: SocketIO(),
  // debug: false
})

export default RummikubClient
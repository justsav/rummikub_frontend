import { Client } from 'boardgame.io/react'
import { SocketIO, Local } from 'boardgame.io/multiplayer'
import Rummikub from './Rummikub'
import RummikubBoard from './RummikubBoard'

const RummikubClient = Client({
  game: Rummikub, 
  board: RummikubBoard,
  // multiplayer: SocketIO(), //Comment this line to play locally
  multiplayer: Local()
  // debug: false
})

export default RummikubClient
import { Client } from 'boardgame.io/react'
import Rummikub from './Rummikub'
import RummikubBoard from './RummikubBoard'

const App = Client({
  game: Rummikub, 
  board: RummikubBoard,
  // debug: false
})

export default App
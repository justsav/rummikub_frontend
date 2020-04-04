import { PlayerView } from 'boardgame.io/core'

const tiles = [
  'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13',
  'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13',
  'R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10', 'R11', 'R12', 'R13',
  'R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10', 'R11', 'R12', 'R13',
  'O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8', 'O9', 'O10', 'O11', 'O12', 'O13',
  'O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8', 'O9', 'O10', 'O11', 'O12', 'O13',
  'K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K7', 'K8', 'K9', 'K10', 'K11', 'K12', 'K13',
  'K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K7', 'K8', 'K9', 'K10', 'K11', 'K12', 'K13',
  'JK', 'JK'
]



const initializeGame = (ctx) => {
  const G = {
    cells: Array(180).fill(null), // Width-15, Height-12
    secret: { // Unavailable to Players
      pool: ctx.random.Shuffle(tiles)
    },
    players: {},// Available to Player's own object, like players['1']
    playerView: PlayerView.STRIP_SECRETS // Removes secret data before sending to Player
  }
  //Initial draw of cards
  ctx.playOrder.map((player) => {
    G.players[player] = G.secret.pool.splice(-14)
  })

  return G
}

// Dummy move - for testing
const ClickCell = (G, ctx, id) => {
  G.cells[id] = ctx.currentPlayer
}

// 
const UpdateBoard = (G, ctx, board) => {
  G.cells = board
}


const Rummikub = {
  setup: (ctx) => initializeGame(ctx),

  moves: {ClickCell, UpdateBoard},
}

export default Rummikub
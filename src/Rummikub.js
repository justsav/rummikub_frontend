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
    cells: Array(160).fill(null), // Width-15, Height-12
    secret: { // Unavailable to Players
      pool: ctx.random.Shuffle(tiles)
    },
    players: {},// Available to Player's own object, like players['1']
  }
  //Initial draw of cards
  ctx.playOrder.forEach((player) => {
    const arr = G.secret.pool.splice(-14)
    G.players[player] = Array(32).fill(null)
    G.players[player].splice(0, 14, ...arr)
  })

  return G
}

const MoveTile = (G, ctx, {fromLocation, fromX, fromY, toLocation, toX, toY}) => {
  let origin, destination, originIndex, destinationIndex
  console.log(fromX, fromY, fromLocation)
  console.log(toX, toY, toLocation)

  if (fromLocation === 'board') {
    origin = G.cells
    originIndex = fromY * 16 + fromX
  } else if (fromLocation === 'rack') {
    origin = G.players[ctx.currentPlayer]
    originIndex = fromY * 6 + fromX
  } else {
    console.log(fromX, fromY, fromLocation)
    throw new Error('invalid origin location!')
  }

  if (toLocation === 'board') {
    destination = G.cells
    destinationIndex = toY * 16 + toX
  } else if (toLocation === 'rack') {
    destination = G.players[ctx.currentPlayer]
    destinationIndex = toY * 8 + toX
  } else {
    console.log(toX, toY, toLocation)
    throw new Error('invalid destination location!')
  }

  // Copy
  const oTile = origin[originIndex]
  const dTile = destination[destinationIndex]

  // TODO: Handle swapping Tile ON Tile
  // Swap
  destination[destinationIndex] = oTile
  origin[originIndex] = dTile
}


const Rummikub = {
  setup: (ctx) => initializeGame(ctx),

  moves: {MoveTile},

  playerView: PlayerView.STRIP_SECRETS, // TODO: Remove when deploying to production
}

export default Rummikub
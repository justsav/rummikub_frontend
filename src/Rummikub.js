import { PlayerView, INVALID_MOVE } from 'boardgame.io/core'
import {BOARD_WIDTH, BOARD_HEIGHT, RACK_WIDTH, RACK_HEIGHT} from './constants'
import {checkLegal} from './rules/checkLegal'

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
    cells: Array( BOARD_HEIGHT * BOARD_WIDTH ).fill(null),
    secret: { // Unavailable to Players
      pool: ctx.random.Shuffle(tiles)
    },
    players: {},// Available to Player's own object, like players['1']
  }
  //Initial draw of cards
  ctx.playOrder.forEach((player) => {
    const arr = G.secret.pool.splice(-14)
    G.players[player] = Array( RACK_HEIGHT * RACK_WIDTH ).fill(null)
    G.players[player].splice(0, arr.length, ...arr)
  })

  return G
}

const MoveTile = (G, ctx, {fromLocation, fromX, fromY, toLocation, toX, toY}, playerID, isCurrentPlayer) => {
  if (!isCurrentPlayer && (toLocation !== 'rack' || fromLocation !== 'rack')) return INVALID_MOVE
  if (isCurrentPlayer && fromLocation === 'board' && toLocation === 'rack') return INVALID_MOVE

  const convertXYtoIndex = (location, x, y) => {
    switch (location) {
      case 'board':
        return [ G.cells, y * BOARD_WIDTH + x ]
      case 'rack':
        return [ G.players[playerID], y * RACK_WIDTH + x ]
      default:
        console.err('Failed to convert', x, y, location)
        throw new Error('invalid location!')
    }
  }

  const [origin, originIndex] = convertXYtoIndex(fromLocation, fromX, fromY)
  const [destination, destinationIndex] = convertXYtoIndex(toLocation, toX, toY)

  // Copy
  const oTile = origin[originIndex]
  const dTile = destination[destinationIndex]

  // Swap
  destination[destinationIndex] = oTile
  origin[originIndex] = dTile
}

const FinishTurn = (G, ctx) => {
  if (!checkLegal(G.cells)) {
    return INVALID_MOVE
  }
  ctx.events.endTurn()
}

const PullTile = {
  move: (G, ctx, playerID) => {
    const playerRack = G.players[playerID]
    const index = playerRack.findIndex(element => element === null)

    if (index >= 0) {
      const tile = G.secret.pool.pop()
      if (tile === undefined) {
        console.log('POOL IS EMPTY')
        return INVALID_MOVE
      }
      playerRack[index] = tile// pop can fail
    } else {
      console.log('Player rack is full')
      return INVALID_MOVE
    }
  },
  client: false
}

const Rummikub = {
  name: 'rummikub',

  setup: (ctx) => initializeGame(ctx),

  phases: {
    play: {
      start: true,
      turn: {
        activePlayers: {
          currentPlayer: 'playBoard',
          others: 'playRack'
        },
        stages: {
          playBoard: {
            moves: {MoveTile, FinishTurn, PullTile}

          },
          playRack: {
            moves: {MoveTile}
          }
        }
      }
    }
  },

  playerView: PlayerView.STRIP_SECRETS,

}

export default Rummikub
import { PlayerView, INVALID_MOVE } from 'boardgame.io/core'
import _ from 'lodash'
import {BOARD_WIDTH, BOARD_HEIGHT, RACK_WIDTH, RACK_HEIGHT} from './constants'
import {checkLegal} from './rules/checkLegal'
import {check30} from './rules/check30'

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

const createMeld = (players) => {
  const meldObject = {}
  players.forEach(player => {
    meldObject[player] = false
  })
  return meldObject
}

const initializeGame = (ctx) => {
  const G = {
    cells: Array( BOARD_HEIGHT * BOARD_WIDTH ).fill(null),
    secret: { // Unavailable to Players
      pool: ctx.random.Shuffle(tiles)
    },
    players: {},// Available to Player's own object, like players['1']
    meld: createMeld(ctx.playOrder)
  }
  //Initial draw of cards
  ctx.playOrder.forEach((player) => {
    const arr = G.secret.pool.splice(-14)
    G.players[player] = Array( RACK_HEIGHT * RACK_WIDTH ).fill(null)
    G.players[player].splice(0, arr.length, ...arr)
  })

  return G
}

const captureSnapshot = (G, ctx) => {
  const copyBoard = Array.from(G.cells)
  const copyRack = Array.from(G.players[ctx.currentPlayer])
  G.secret.boardSnapshot = copyBoard
  G.secret.rackSnapshot = copyRack
}

const MoveTile = (G, ctx, {fromLocation, fromX, fromY, toLocation, toX, toY}, playerID, isCurrentPlayer) => {
  if (!isCurrentPlayer && (toLocation !== 'rack' || fromLocation !== 'rack')) return INVALID_MOVE

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
  
  // Disallow swapping on a non-empty tile - less headache
  if (dTile !== null) return INVALID_MOVE

  // Prevent all moves from board to rack except if person has initial meld and the tile is a joker
  if (isCurrentPlayer && fromLocation === 'board' && toLocation === 'rack') {
    if (!G.meld[ctx.currentPlayer] && oTile !== 'JK') {
      return INVALID_MOVE
    }
  }

  // Swap
  destination[destinationIndex] = oTile
  origin[originIndex] = dTile
}

const FinishTurn = {
  move: (G, ctx) => {
    if (!checkLegal(G.cells)) {
      console.error('Board is not legal')
      return INVALID_MOVE
    }
    
    if(G.meld[ctx.currentPlayer] === false){
      if (!check30(G.secret.boardSnapshot, G.cells)) {
        console.error('Meld is not satisfied')
        return INVALID_MOVE
      } else {
        G.meld[ctx.currentPlayer] = true
      }
    }
    
    if (_.isEqual(G.secret.boardSnapshot, G.cells)) {
      console.log('Player hasn\'t made a move yet')
      return INVALID_MOVE
    }

    ctx.events.endTurn()
  },
  client: false
}

const PullTile = {
  move: (G, ctx, playerID) => {
    if (!_.isEqual(G.cells, G.secret.boardSnapshot)) {
      console.error('Board has been changed')
      return INVALID_MOVE
    }
    const playerRack = G.players[playerID]
    const index = playerRack.findIndex(element => element === null)

    if (index >= 0) {
      const tile = G.secret.pool.pop()
      if (tile === undefined) {
        console.log('POOL IS EMPTY')
        return INVALID_MOVE
      }
      playerRack[index] = tile
    } else {
      console.log('Player rack is full')
      return INVALID_MOVE
    }
    ctx.events.endTurn()
  },
  client: false
}

const ResetBoard = {
  move: (G, ctx) => {
    G.cells = G.secret.boardSnapshot
    G.players[ctx.currentPlayer] = G.secret.rackSnapshot
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
        onBegin: (G, ctx) => captureSnapshot(G, ctx),
        activePlayers: {
          currentPlayer: 'playBoard',
          others: 'playRack'
        },
        stages: {
          playBoard: {
            moves: {MoveTile, FinishTurn, PullTile, ResetBoard}
            
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
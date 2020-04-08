import { PlayerView, INVALID_MOVE } from 'boardgame.io/core'
import {BOARD_WIDTH, BOARD_HEIGHT, RACK_WIDTH, RACK_HEIGHT} from './constants'

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

// This functions returns array with sub-arrays of all the combinations in the Game board.
function getAllCombinations(board) {
  const rows = []
  for (let i = 0; i < board.length; i += 16) {
    rows.push(board.slice(i, i + 16))
  }
  const allCombinations = []
  let tempArray = []

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] !== null) {
        tempArray.push(rows[i][j])
      }
      if (rows[i][j] === null) {
        if (tempArray.length > 0) {
          allCombinations.push(tempArray)
          tempArray = []
        }
      }
    }
    if (tempArray.length > 0) {
      allCombinations.push(tempArray)
    }
  }
  return allCombinations
}

/////////////////////////////////////////////////////////////////////
// The main function to check if the move in the GameBoard is Legal
const checkLegal = (board) => {
  let resultArray = []
  const combinations = getAllCombinations(board)
  for (let i = 0; i < combinations.length; i++) {
    if (combinations[i].length < 3)
      return false
  }

  // Function returns true if combination are in valid Group
  function checkRuns(combinations) {
    let resultArray = []
    const allEqual = (arr) => arr.every(item => item === arr[0])
    const isConsecutive = (arr) =>{
      for(let i=0; i<arr.length - 1; i++){
        if(arr[i + 1]-arr[i] !== 1) return false
      }
      return true
    }
    for (let i = 0; i < combinations.length; i++) {
      let numArray = []
      let alphaArray = []
      for (let j = 0; j < combinations[i].length; j++) {
        let tile = combinations[i][j]
        if(numArray.length > 0 && tile === 'JK'){
          numArray.push((parseInt(numArray[numArray.length - 1]) + 1).toString())
        }
        else if(numArray.length === 0 && tile === 'JK'){
          if(combinations[i][j + 1] == "JK"){
          numArray.push((parseInt((combinations[i][j + 2]).replace(/[^0-9]/g, "")) - 2).toString())
          }
          else{numArray.push((parseInt((combinations[i][j + 1]).replace(/[^0-9]/g, "")) - 1).toString())}
        }
        else{
          let alpha = tile.replace(/[0-9]/g, "")
          let num = tile.replace(/[^0-9]/g, "")
          alphaArray.push(alpha)
          numArray.push(num)
        }
      }
      if(!isConsecutive(numArray) || !allEqual(alphaArray)){
        resultArray.push(false)
      }
      else{resultArray.push(true)}
    }
    return resultArray
  }
  
  function checkGroups(combinations) {
    let resultArray = []
    const allEqual = (arr) => arr.every(item => item === arr[0])
    for (let i = 0; i < combinations.length; i++) {
      if(combinations[i].length > 4) return false
      let numArray = []
      let alphaArray = []
      for (let j = 0; j < combinations[i].length; j++) {
        let tile = combinations[i][j]
        if(tile === 'JK'){continue}
        else{
          let alpha = tile.replace(/[0-9]/g, "")
          let num = tile.replace(/[^0-9]/g, "")
          alphaArray.push(alpha)
          numArray.push(num)
        }
      }
      if(!allEqual(numArray) || allEqual(alphaArray)){
        resultArray.push(false)
      }
      else{resultArray.push(true)}
        
    }
    return resultArray
  }
  let resultGroup = checkGroups(combinations)
  let resultRuns = checkRuns(combinations)
  for(let i = 0; i < resultRuns.length; i++){
    if(resultGroup[i] === resultRuns[i]){
      return false
    }
  }
  return true
}

const MoveTile = (G, ctx, {fromLocation, fromX, fromY, toLocation, toX, toY}) => {
  const convertXYtoIndex = (location, x, y) => {
    switch (location) {
      case 'board':
        return [ G.cells, y * BOARD_WIDTH + x ]
      case 'rack':
        return [ G.players[ctx.currentPlayer], y * RACK_WIDTH + x ]
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

    if (index) {
      playerRack[index] = G.secret.pool.pop()
    } else {
      throw new Error('Player rack is full')
    }
  },
  client: false
}

const Rummikub = {
  setup: (ctx) => initializeGame(ctx),

  moves: {MoveTile, FinishTurn, PullTile}, 

  playerView: PlayerView.STRIP_SECRETS, // TODO: Remove when deploying to production

}

export default Rummikub
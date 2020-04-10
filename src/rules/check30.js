import _ from 'lodash'
import { getAllCombinations } from './checkLegal'
// getAllCombinations(boardSnapshot) => array
// getAllCombinations(boardMeld) => array

// FinishTurn
// check if player has player initial meld
// if FALSE:
//    1. Check that all combinations from boardSnapshot are untouched and present
//    2. Take the player's combinations and get the total points
//    3. Check total >= 30
//    4. Check boardLegal 
//    5. ctx.endTurn()
// if TRUE:
// proceed usual


export function check30(boardSnapshot, boardMeld) {
    // 1. Check all existing combinations from boardSnapshot are untouched and present
    const beforeMeld = getAllCombinations(boardSnapshot)
    const afterMeld = getAllCombinations(boardMeld)
    const playerMeld = _.differenceWith(afterMeld, beforeMeld, _.isEqual)
    const compareMeld = _.differenceWith(afterMeld, playerMeld, _.isEqual)
    const equalMeld = _.isEqual(beforeMeld, compareMeld)

    // 2. Check run or group
    let total = 0
    for(let i = 0; i < playerMeld.length; i++){
      total = total + countPoints(playerMeld[i])
    }
      
    return equalMeld && total >= 30
}

export function countPoints(combination) {
  let points = 0

  for (const tile of combination) {
    if (tile === 'JK') {
      const jkIndex = combination.findIndex(e => e === 'JK')
      const prev = combination[jkIndex-1]
      const next = combination[jkIndex+1]
      if (isRun(combination)) {
        if (prev !== undefined) {
          points += parseInt(prev.substring(1)) + 1
        } else {
          points += parseInt(next.substring(1)) - 1
        }
      }
      if (isGroup(combination)) {
        if (prev !== undefined) {
          points += parseInt(prev.substring(1))
        } else {
          points += parseInt(next.substring(1))
        }
      }
    } else {
      points += parseInt(tile.substring(1))
    }
  }
  
  return points
}

export function isGroup(combination) {
  if (combination.length < 3 || combination.length > 4 ) {
    return false
  }
  
  const copy = Array.from(combination)
  if (copy[0] === 'JK') {
    if (copy[1] !== 'JK') {
      copy[0] = copy[1]
      copy[1] = 'JK'
    } else if (copy[2] !== 'JK') {
      copy[0] = copy[2]
      copy[2] = 'JK'
    }
  }

  const colors = copy.map(tile => tile.charAt(0))
  const isSameNumber = copy.every(tile => tile.substring(1) === copy[0].substring(1) || tile === 'JK')
  const isDistinctColors = _.isEqual(colors, _.uniq(colors))

  return isSameNumber && isDistinctColors
}

export function isRun(combination) {
  if (combination.length < 3 || combination.length > 13) {
    return false
  }

  const copy = Array.from(combination)
  const nonjoker = copy.find(tile => tile !== 'JK')
  const isSameColor = copy.every(tile => tile.charAt(0) === nonjoker.charAt(0) || tile === 'JK')

  let prev = undefined
  for (const tile of copy) {
    if (tile === 'JK') {
      if (copy[0] === 'JK')
        prev = 1
      else
        prev++

    } else {
      const num = parseInt(tile.substring(1))
    
      if (prev !== undefined && num !== (prev + 1)) {
        return false
      }
  
      prev = num

    }
  }

  return isSameColor
}
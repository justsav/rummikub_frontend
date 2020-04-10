import {checkLegal} from './checkLegal.js'

const input = [
  [[null], true], //empty
  [[null, 'JK'], false], //Simple empty and Joker
  [[null, 'O1'], false], //empty and tile
  [['B1', 'B2', 'B3'], true], //Simple run
  [['B1', 'B2', 'JK'], true], //Simple run with Joker
  [['B1', 'JK', 'JK'], true],//Simple run with Jokers
  [['B1', 'K1', 'O1'], true],//'Simple group
  [['B1', 'K1', 'JK'], true],//Simple group with Joker
  [['JK', 'K1', 'JK'], true],//Simple group with Joker
  [['B1', 'B2', 'B3', 'O1', 'O2', 'O3'], false],//adjacent runs
  [['B1', 'K1', 'JK', 'O13', 'R13', 'K13'], false],//adjacent groups
  [['B1', 'B2', 'B3', null, 'O1', 'O2', 'O3'], true],//separated runs
  [['B1', 'K1', 'JK', null, 'O13', 'R13', 'K13'], true],//separated groups

  [['O1', 'O2'], false], //length < 3
  [['O1'], false], //length < 3
  [['O1', 'O2', 'O3', null, 'B1', null], false], //length < 3
  [['O1', 'O2', 'O3', null, 'B12', 'O12'], false], //group < 3
  [['B12', 'O12', 'K12', 'R12'], true], //full group
  [['B12', 'O12', 'R12', 'R12'], false], //duplicate colors group
  [['B12', 'O12', 'K12', 'R12', 'B12'], false], //full and duplicate colors group
  [['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13'], true], // full run
  [['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B9', 'B10', 'B11', 'B12', 'B13'], false], //broken run
  [['B12', 'B13', 'B1', 'B2'], false], //mismatched run
  [['B12', 'B13', 'B2', null, 'O3', 'B3', null, 'JK', 'K1', 'JK'], false], //all wrong combinations except one
  [['B1', 'O2', 'R3', 'K4', 'O5', 'R6', 'O7', 'R9', 'K10', 'B11', 'B12', 'B13'], false], //wrong run except last three
  [['B1', 'B2', 'B3', 'B4', 'B5', 'JK', 'B7'], true],// run with joker in middle
  [['O1', 'O2', 'O3', 'O7', 'O8', 'JK', 'O10'], false],
  [['K11', 'JK', 'O11'], true],
  [['B1', 'O1', 'R1', 'K1'], true],
  [['O13', 'B13', 'K13'], true],
  [['K1','K2','K3','K4','K5','K6'], true],
  [['R8', 'B8', 'K8', 'O8'], true],
  [['B9', 'B10', 'B11', 'B12', 'B13'], true],

  [['K11', 'JK', 'O11', null, 'B1', 'O1', 'R1', 'K1', null, 'O13', 'B13', 'K13', null, null, null, null, 'K1','K2','K3','K4','K5','K6', null, 'R8', 'B8', 'K8', 'O8', null, null, null, null, null, null, null, 'B9', 'B10', 'B11', 'B12', 'B13'], true],
  [[null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'R7', 'R8', 'R9', 'R10'], false]

]

test.each(input)('checkLegal(%s) is %s', (board, isLegal) => {
  expect(checkLegal(board)).toBe(isLegal)
})

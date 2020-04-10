import {check30, isGroup, isRun, countPoints} from './check30'


const input = [
  [['B1', 'K1', 'JK'], ['B1', 'K1', 'JK', null, 'O13', 'R13', 'K13'], true],
  [['B1', 'K1', 'JK'], ['B1', 'K1', 'JK', null, 'O13', 'R13', 'K13', 'B13'], true],
  [['B1', 'K1', 'JK'], ['B1', 'K1', 'JK', null, 'O7', 'R7', 'K7', 'B7'], false],
  [['B1', 'K1', 'JK'], ['B1', 'K1', 'JK', null, 'O8', 'R8', 'K8', 'B8'], true],
  [['B1', 'K1', 'JK'], ['B1', 'K1', 'JK', null, 'O8', 'R8', 'JK', 'B8'], true],
  [['B1', 'K1', 'JK'], ['B1', 'K1', 'JK', null, 'B9', 'B10', 'B11'], true],
  [['B1', 'K1', 'JK'], ['B1', 'K1', 'JK', null, 'B8', 'B9', 'B10'], false],
  [['B1', 'K1', 'JK'], ['B1', 'K1', 'JK', null, 'B8', 'B9', 'B10', 'B11'], true],
  [['B1', 'K1', 'JK'], ['B1', 'K1', 'JK', null, 'B8', 'B9', 'B10', 'JK'], true],
  [['B1', 'K1', 'JK'], ['B1', 'K1', 'JK', null, 'B8', 'B9', 'JK', 'B11'], true],
  [['B1', 'K1', 'JK'], ['B1', 'K1', 'JK', null, 'B8', 'JK', 'B10', 'B11'], true],
  [['B1', 'K1', 'JK'], ['B1', 'K1', 'JK', null, 'JK', 'B9', 'B10', 'B11'], true],
  [['K1', 'JK', 'K3'], [ null, 'B8', 'B9', 'B10', 'B11', null, 'K1', 'JK', 'K3'], true],
  [['K1', 'JK', 'K3'], [ null, 'B8', 'JK', 'B10', 'B11', null, 'K1', 'JK', 'K3'], true],
  [['K1', 'JK', 'K3'], [ null, 'B1', 'B2', 'B3', 'B4', null, 'K1', 'JK', 'K3'], false],
]

test.each(input)('check30(%s, %s) is %s', (initialboard, finalboard, is30) => {
    expect(check30(initialboard, finalboard)).toBe(is30)
})


const groups = [
  [ ['O1', 'B1', 'K1'], true],
  [ ['O1', 'B1', 'K1', 'R1'], true],
  [ ['O12', 'B12', 'JK'], true],
  [ ['O1', 'JK', 'B1'], true],
  [ ['JK', 'O1', 'B1'], true],
  [ ['B10', 'O10', 'R10'], true],
  [ ['B10', 'O10', 'R10', 'K10'], true],
  [ ['JK', 'O10', 'R10', 'K10'], true],
  [ ['B10', 'JK', 'R10', 'K10'], true],
  [ ['B10', 'O10', 'JK', 'K10'], true],
  [ ['B10', 'O10', 'R10', 'JK'], true],
  [ ['B10', 'O10', 'R10', 'R10'], false],
  [ ['B10', 'O10', 'R10', 'K10', 'JK'], false],
  [ ['B10', 'O10', 'R10', 'K10', 'R10'], false],
  [ ['B10', 'R10', 'R10'], false],
  [ ['B10', 'R10'], false],
  [ ['O8', 'R8', 'JK', 'B8'], true]
]

test.each(groups)('isGroup %s', (group, res) => {
  expect(isGroup(group)).toEqual(res)
})

const runs = [
  [ ['O1', 'B1', 'K1'], false],
  [['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13'], true], // full run
  [['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B9', 'B10', 'B11', 'B12', 'B13'], false], //broken run
  [['B12', 'B13', 'B1', 'B2'], false], //mismatched run
  [['B1', 'B2', 'B3', 'JK', 'B5', 'B6', 'B7'], true],// run with joker
  [['JK', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'], true],// run with joker at beginning
  [['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'JK'], true], // run with joker at end
  [['B11', 'B12', 'B13', 'JK'], false],// joker overflow
  [['JK', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6'], false],// joker overflow
]

test.each(runs)('isRun %s', (group, res) => {
  expect(isRun(group)).toEqual(res)
})

const points = [
  [ ['O1', 'B1', 'K1'], 3],
  [['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13'], 91], // full run
  [['B1', 'B2', 'B3', 'JK', 'B5', 'B6', 'B7'], 28],// run with joker
  [['JK', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'], 28],// run with joker at beginning
  [['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'JK'], 28],// run with joker at end
  [['O8', 'R8', 'JK', 'B8'], 32]

]

test.each(points)('countPoints %s', (combination, res) => {
  expect(countPoints(combination)).toEqual(res)
})
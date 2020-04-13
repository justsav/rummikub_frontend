import {countPoints, countPlayersPoints} from './countPoints'

const racks = [
  [ [null, 'O1', 'B1', 'K1', null, null], 3],
  [ ['O1', 'B1', 'K1', 'R1'], 4],
  [ ['O12', 'B12', 'JK'], 54],
  [ ['O1', 'JK', 'B1'], 32],
  [ ['JK', 'O1', 'B1'], 32],
  [ ['B10', 'O10', 'R10'], 30],
  [ ['B10', 'O10', 'R10', 'K10'], 40],
  [ ['JK', 'O10', 'R10', 'K10'], 60],
  [ ['B10', 'JK', 'R10', 'K10'], 60],
  [ ['B10', 'O10', 'JK', 'K10'], 60],
  [ ['B10', 'O10', 'R10', 'JK'], 60],
  [ ['B10', 'O10', 'R10', 'R10'], 40],
  [ ['B10', 'O10', 'R10', 'K10', 'JK'], 70],
  [ ['B10', 'O10', 'R10', 'K10', 'R10'], 50],
  [ ['B10', 'R10', 'R10'], 30],
  [ ['B10', 'R10'], 20],
  [ ['O8', 'R8', 'JK', 'B8'], 54]
]

test.each(racks)('countRack %s', (rack, res) => {
  expect(countPoints(rack)).toEqual(res)
})

const players = [
  [{0: ['B13'], 1: ['R12'], 2: ['O5'], 3: [null]}, {0: -13, 1: -12, 2: -5, 3: 30}]
]

test.each(players)('countPlayersRack %s', (rack, res) => {
  expect(countPlayersPoints(rack)).toEqual(res)
})
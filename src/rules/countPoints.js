export function countPoints(rack) {
  let points = 0

  rack.forEach(tile => {
    if (tile === 'JK')
      points += 30
    else if (tile !== null)
      points += parseInt(tile.substring(1))
  })
  
  return points
}

export function countPlayersPoints(players) {
  const entries = Object.entries(players)
  const points = {}
  let total = 0
  entries.forEach(player => {
    const p = countPoints(player[1])
    points[player[0]] = -p
    total += p
  })

  const winner = Object.keys(points).find(key => points[key] === 0)
  points[winner] = total

  return points
}
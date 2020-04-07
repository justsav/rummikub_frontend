import React from 'react'

const PullTileButton = ({G, playerID, events}) => {
    const handleClick = (e) => {
        e.preventDefault()
        let found = false
        let pull = G.secret.pool.pop()
        for (let i = 0; i < G.players[playerID].length; i++) {
          if (G.players[playerID][i] === null) {
            G.players[playerID][i] = pull
            found = true
            break
          }
        }
        if (!found) {
          throw new Error('No Null Found!')
        } 
        events.endTurn()
    }
    return (
        <button onClick={handleClick}>
        Pull Tile
        </button>
    );
}

export default PullTileButton
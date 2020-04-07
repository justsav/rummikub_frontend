import React from 'react'

const PullTileButton = ({playerID, PullTile}) => {
    const handleClick = () => {
      PullTile(playerID)
    }

    return (
        <button onClick={handleClick}>
        Pull Tile
        </button>
    );
}

export default PullTileButton
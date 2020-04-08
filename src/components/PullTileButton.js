import React from 'react'
import { Button } from 'react-bootstrap';

const PullTileButton = ({playerID, PullTile}) => {
    const handleClick = () => {
      PullTile(playerID)
    }

    return (
        <Button id='pt-btn' variant="dark" size="lg" onClick={handleClick}>
        + Pull Tile
        </Button>
    );
}

export default PullTileButton
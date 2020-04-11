import React from 'react'
import { Button } from 'react-bootstrap';

const EndTurnButton = ({FinishTurn}) => {

  const handleClick = () => {
      FinishTurn()
    }
  return (
      <Button className='turn-btn' variant="dark" onClick={handleClick}>
      END TURN
      </Button>
  );
}

export default EndTurnButton
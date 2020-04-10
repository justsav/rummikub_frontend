import React from 'react'
import { Button } from 'react-bootstrap';

const EndTurnButton = ({FinishTurn}) => {

  const handleClick = () => {
      FinishTurn()
    }
  return (
      <Button id='et-btn' variant="dark" size="lg" onClick={handleClick}>
      End Turn
      </Button>
  );
}

export default EndTurnButton
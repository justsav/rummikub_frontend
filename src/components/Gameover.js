import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function Gameover({
                                  showGameover,
                                  setShowGameover,
                                  gameOver,
                                  opponentsData,
                                  playerID, 
                                  gameMetadata
                              }) {
  const handleClose = () => setShowGameover(false);

  
  const showName = () => {
    if (gameOver.winner === playerID) {
      return 'You are the winner!'
    } else {
      return 'Winner is ' + opponentsData.find(elem => elem.id === parseInt(gameOver.winner)).name
    }
  }

  return (
    <>
      <Modal show={showGameover} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>
          </Modal.Title>
          <h3>Gameover</h3>
        </Modal.Header>

        <Modal.Body id='rules-body'>
          {showName()}
        </Modal.Body>

        <Modal.Footer>
          <Button id='rules-btn' variant="primary" onClick={handleClose}>
            Return to board
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}

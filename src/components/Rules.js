import React from 'react';
import { Modal, Button } from 'react-bootstrap'

export default function Rules({
                                  show,
                                  setShow,
                              }) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>
          </Modal.Title>
          <h3>Welcome to Rummikub Rules</h3>
        </Modal.Header>

        <Modal.Body id='rules-body'>
        <ul>
          <li>The object of the game is to be the first player to get rid of all their tiles.</li>
          <li>Players start with <strong>14 tiles</strong> each, and take turns, playing tiles from their own <strong>rack</strong> on to the <strong>game board</strong> when the tiles can form a set, or when the tiles can be added to an existing set.</li>
          <li><strong>Two Types of Sets:</strong></li>
          <ul>
          <li>Play a <strong>“Group”</strong> of tiles:  This is 3 or more tiles of the same number, which must be different colors.</li>
          <li>Play a <strong>“Run”</strong> of tiles:  This is a series of 3 or more consecutive number tiles, which must be the same color.</li>
          </ul>
          <li><strong>Important</strong>: A player’s first play on the game board must be a set that totals 30 or more (sum of all tiles played). After a player has made the first move with a value over 30, any tiles can be played to the middle on that player's subsequent turns.</li>
          <li>When players are unable to play a set on the board, <strong>they draw a tile and their turn ends.</strong></li>
          <li>A player can play as many sets as he/she wants per each turn.</li>
          <li>During their turn, a player can add tiles to existing sets, and existing sets can be broken up or moved around to form new sets, as long as at least one tile came from his/her rack, and every tile ends up in an acceptable set by the end of the turn.</li>
          <li>The <strong>joker tile</strong> can be played as any number and color to help complete a set. Any time a player has a tile that a joker is representing, the tile can replace the joker. When the joker is moved, it must be used in a new set on the board in the same turn, and can take on a new value.</li>
          <li>Again, the player to play <strong>all his/her tiles first wins</strong> the game.</li>
        </ul>
        </Modal.Body>

        <Modal.Footer>
          <Button id='rules-btn' variant="primary" onClick={() => handleClose()}>
            Let's Play
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}

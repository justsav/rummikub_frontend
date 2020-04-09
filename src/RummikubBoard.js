import React from 'react'
import MainBoard from './components/MainBoard'
import Rack from './components/Rack'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import PullTileButton from './components/PullTileButton'
import EndTurnButton from './components/EndTurnButton'
import { Container, Row, Col } from 'react-bootstrap';

const RummikubBoard = ({G, ctx, moves, events, playerID, isActive}) => {
  const isCurrentPlayer = ctx.currentPlayer === playerID
  const handleMove = (coordinates) => {
    moves.MoveTile(coordinates, playerID, isCurrentPlayer)
  }

  return (
    <DndProvider backend={Backend}>
      <div>
        <Container id='master' fluid>
          <Row id='top-row'>
            <Col id='logo-area' md={3}>
              <img src='https://rummikub.co.nz/wp-content/uploads/2019/08/Rummikub_logo-4.png' alt='game logo' width="200" />
              <p>RULES | EXIT</p>
            </Col>
            <Col id='opponent-info' md={6}>
              <p>TODO: OPPONENT INFO</p>
            </Col>
            <Col id='end-turn' md={3}>
              {isCurrentPlayer && <EndTurnButton FinishTurn={moves.FinishTurn}/>}
            </Col>
          </Row>
          <Row md={12}>
            <Container id='main-board' fluid>
              <MainBoard {...{G, MoveTile: handleMove}}/>
            </Container>
          </Row>
          <Row id='bottom-row'>
            <Col id='self-info' md={2}>
              <p>Player {playerID} {isCurrentPlayer && ' - YOUR TURN'}</p>
              <p>TODO: POINTS</p>
            </Col>
            <Col id='rack-container' md={8}>
              <Row id='rack-title'>
                <h5>Your Tiles</h5>
              </Row>
              <Row id='rack-row'>
                <Rack {...{playerRack: G.players[playerID], MoveTile: handleMove}}/>
              </Row>
            </Col>
            <Col id='pull-tile' md={2}>
              {isCurrentPlayer &&
                <React.Fragment>
                  <PullTileButton {...{playerID, PullTile: moves.PullTile}}/>
                </React.Fragment>
              }
            </Col>
          </Row>
        </Container>
      </div>
    </DndProvider>
  )
}

export default RummikubBoard;

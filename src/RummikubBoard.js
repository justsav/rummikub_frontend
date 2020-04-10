import React, {useState} from 'react'
import { DndProvider } from 'react-dnd'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import MainBoard from './components/MainBoard'
import Rack from './components/Rack'
import Backend from 'react-dnd-html5-backend'
import PullTileButton from './components/PullTileButton'
import EndTurnButton from './components/EndTurnButton'
import Lobby from './components/Lobby'
import avatar from './static/avatar.svg'
import Rules from './components/Rules'

const RummikubBoard = ({G, ctx, moves, events, playerID, isActive, gameMetadata}) => {
  const [show, setShow] = useState(false);
  
  const isCurrentPlayer = ctx.currentPlayer === playerID
  const handleMove = (coordinates) => {
    moves.MoveTile(coordinates, playerID, isCurrentPlayer)
  }

  const opponents = []
  for (const [index, value] of gameMetadata.entries()) {
    if (playerID !== value.id.toString() && value.name) {
      opponents.push(
        <span className="avatar">
          <img src={avatar} alt="player avatar" />
          <p>Player {value.id + 1}:</p>
          <p>{value.name}</p>
        </span>
      )
    }
  }

  return (
    <DndProvider backend={Backend}>
      <div>
        <Container id='master' fluid>
          <Row id='top-row'>
            <Col id='logo-area' md={3}>
              <img src='https://rummikub.co.nz/wp-content/uploads/2019/08/Rummikub_logo-4.png' alt='game logo' width="200" />
              <p>
              <div className='admin-btn-container'>
                <Button className='small-btn' variant="dark" size="sm" onClick={() => setShow(true)}>
                  How to Play
                </Button>
                {/* <LinkContainer to='/lobby'> */}
                  <Button className='small-btn' variant="dark" size="sm" >
                    Exit Game
                  </Button>
                {/* </LinkContainer> */}
                </div>
              </p>
              {<Rules {...{show, setShow}} />}
            </Col>
            <Col id='opponent-info' md={6}>
              {opponents}
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

              <p>Player {parseInt(playerID) + 1} {isCurrentPlayer && ' - YOUR TURN'}</p>
              <p>Points: 125</p>
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

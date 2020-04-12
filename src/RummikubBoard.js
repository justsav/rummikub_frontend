import React, { useState, useEffect, useRef } from 'react'
import { DndProvider } from 'react-dnd'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

import MainBoard from './components/MainBoard'
import Rack from './components/Rack'
import Backend from 'react-dnd-html5-backend'
import PullTileButton from './components/PullTileButton'
import EndTurnButton from './components/EndTurnButton'
import avatar from './static/av.png'
import Rules from './components/Rules'

const RummikubBoard = ({G, ctx, moves, playerID, gameID, gameMetadata}) => {
  const isCurrentPlayer = ctx.currentPlayer === playerID
  const [show, setShow] = useState(false)
  const handleMove = (coordinates) => {
    moves.MoveTile(coordinates, playerID, isCurrentPlayer)
  }

  const [opponents, setOpponents] = useState([])
  const stopFetching = useRef(false)

  useEffect(() => {
    const renderOpponents = (input) => {
      const opp = []
      for (const [, value] of input.entries()) {
        if (playerID !== value.id.toString() && value.name) {
          opp.push(
            <span key={value.id} className="avatar">
              <img src={avatar} alt="player avatar" />
              <p>PLAYER {value.id + 1}:</p>
              <p>{value.name}</p>
            </span>
          )
        }
      }
      setOpponents(opp)
    }
    
    const getMetadata = (init) => {
      if (init) {
        renderOpponents(init)
      } else {
        fetch(`/games/rummikub/${gameID}`)
        .then(res => res.json())
        .then(data => {
          renderOpponents(data.players)
        })
        .catch(err => console.error(err))
      }
    }

    getMetadata(gameMetadata)

    stopFetching.current = setInterval(() => getMetadata(), 5000)
    return () => clearInterval(stopFetching.current)
  }, [gameMetadata, gameID, playerID])
  
  useEffect(() => {
    if (gameID && playerID && (opponents.length + 1) >= gameMetadata.length) {
      clearInterval(stopFetching.current)
    }
  }, [opponents, gameMetadata, gameID, playerID])

  const handleReset = () => {
    moves.ResetBoard()
  }

  if (!gameID && !playerID) {
    return <Redirect to="/lobby"/>
  } else {
    return (
      <DndProvider backend={Backend}>
        <div>
          <Container id='master' fluid>
            <Row id='top-row'>
              <Col id='logo-area' md={3}>
                <img src='https://rummikub.co.nz/wp-content/uploads/2019/08/Rummikub_logo-4.png' alt='game logo' width="275" />
                <p>
                <div className='admin-btn-container'>
                  <Button className='small-btn' variant="dark" size="sm" onClick={() => setShow(true)}>
                    How to Play
                  </Button>
                  <LinkContainer to='/lobby'>
                    <Button className='small-btn' variant="dark" size="sm" >
                      Exit Game
                    </Button>
                  </LinkContainer>
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
                <p>{isCurrentPlayer && 'YOUR TURN'}</p>
                <p>PLAYER {parseInt(playerID) + 1}</p>
                <div className="avatar">
                  <img src={avatar} alt="player avatar" />
                </div>
              </Col>
              <Col id='rack-container' md={8}>
                <Row id='rack-title'>
                  <h5>YOUR TILES</h5>
                </Row>
                <Row id='rack-row'>
                  <Rack {...{playerRack: G.players[playerID], MoveTile: handleMove}}/>
                </Row>
              </Col>
              <Col id='pull-tile' md={2}>
                {isCurrentPlayer &&
                  <React.Fragment>
                    <PullTileButton {...{playerID, PullTile: moves.PullTile}}/>
                    <Button className='turn-btn' variant="warning" onClick={handleReset}>RESET BOARD</Button>
                  </React.Fragment>
                }
              </Col>
            </Row>
          </Container>
        </div>
      </DndProvider>
    )
  }
}

export default RummikubBoard;

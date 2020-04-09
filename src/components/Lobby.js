import React, {useEffect, useState} from 'react'
import {Container, Button, Form, ListGroup} from "react-bootstrap"

export default function Lobby({
                                  playerName,
                                  setPlayerName,
                                  gameID,
                                  setGameID,
                                  playerID,
                                  setPlayerID,
                                  credentials,
                                  setCredentials,
                                  setStartGame
                              }) {
    const [games, setGames] = useState([])
    const [numPlayers, setNumPlayers] = useState('2')


    const loadGames = () => {
        fetch('/games/rummikub')
            .then(res => res.json())
            .then(data => setGames(data.rooms))
    }

    const createGame = () => {
        fetch(`/games/rummikub/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numPlayers: numPlayers
            })
        })
            .then(res => res.status)
    }

    const joinGame = (gameId, playerId) => {
        fetch(`/games/rummikub/${gameId}/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playerID: playerId,
                playerName: playerName
            })
        })
            .then(res => res.json())
            .then(data => {
                setGameID(gameId)
                setPlayerID(playerId)
                setCredentials(data.playerCredentials)
            })
            .catch(err => console.error(err))
    }

    const leaveGame = () => {
        fetch(`/games/rummikub/${gameID}/leave`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playerID: playerID,
                credentials: credentials
            })
        })
            .then(res => res.json())
            .then(data => {
                setGameID('')
                setPlayerID('')
                setCredentials('')
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        loadGames()

        const interval = setInterval(() => {
            loadGames()
        }, 2000)
        return () => clearInterval(interval)
    }, [])


    const renderGame = (g, ind) => {
        const [gID, players] = [g.gameID, g.players]
        const freeSlot = players.find(p => !p.name)
        const pID = freeSlot && `${freeSlot.id}`
        return <ListGroup.Item key={ind}>
            {g.players.map(p => p.name ? `[${p.name}] ` : '[free]')}
            {!gameID || freeSlot === undefined
                ?
                <Button
                    onClick={() => joinGame(gID, pID)}
                >Join Game</Button>
                :
                null
            }
            {gameID === gID &&
            <Button
                variant="danger"
                onClick={() => leaveGame(pID)}
            >Leave Game</Button>
            }


        </ListGroup.Item>
    }

    return (
        <Container>
            <Form>
                <Form.Group controlId="playerId">
                    <Form.Label>Enter your name</Form.Label>
                    <Form.Control type="text" value={playerName} onChange={e => setPlayerName(e.target.value)}/>
                </Form.Group>

                <p>Welcome, {playerName}</p>

                <h2>Create a game:</h2>
                <Form.Group controlId="createRoom">
                    <Form.Label>Create a rummikub game</Form.Label>
                    <Form.Row>
                        <Form.Label>Number of players</Form.Label>
                        <Form.Control as="select" onChange={e => setNumPlayers(e.target.value)}>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </Form.Control>
                    </Form.Row>

                </Form.Group>
                <Button variant="primary" onClick={createGame}>Create Game</Button>
            </Form>
            <br/>
            <h2>List of games:</h2>
            <ListGroup>
                {games.map((g, ind) => renderGame(g, ind))}
            </ListGroup>
            <br/>

            <Button
                disabled={!gameID || !playerID || !credentials}
                variant={'primary'}
                onClick={setStartGame}
            >
                Start Game
            </Button>

        </Container>
    )
}


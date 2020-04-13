import React from "react"
import { ListGroup, Button } from "react-bootstrap"

export default function GameList({
  games,
  playerID,
  gameID,
  joinGame,
}) {
  const renderGame = (g, ind) => {
    const [gID, players] = [g.gameID, g.players]
    const freeSlot = players.find((p) => !p.name)
    if (freeSlot === undefined) return null
    const pID = freeSlot && `${freeSlot.id}`
    return (
      <ListGroup.Item key={ind}>
        {g.players.map((p) => (p.name ? `[${p.name}] ` : "[free]"))}
        {!playerID && (!gameID || freeSlot === undefined) ? (
          <Button onClick={() => joinGame(gID, pID)}>Join Game</Button>
        ) : null}
      </ListGroup.Item>
    )
  }

  return (
    <div>
      <h2>List of games:</h2>
      <ListGroup>{games.map((g, ind) => renderGame(g, ind))}</ListGroup>
    </div>
  )
}

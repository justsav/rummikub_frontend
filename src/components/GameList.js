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
      <ListGroup.Item key={ind} id='game-list'>
        {g.players.map((p) => (p.name ? `[${p.name}] ` : "[Available]"))}
        {!playerID && (!gameID || freeSlot === undefined) ? (
          <Button onClick={() => joinGame(gID, pID)}>Join</Button>
        ) : null}
      </ListGroup.Item>
    )
  }

  return (
    <div>
      <h2 id='lobby-subtitle'>- ALL GAMES -</h2>
      <div id='game-list-items'>
        <ListGroup>{games.map((g, ind) => renderGame(g, ind))}</ListGroup>
      </div>
    </div>
  )
}

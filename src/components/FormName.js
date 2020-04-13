import React from "react"
import { Form } from "react-bootstrap"

export default function FormName({ playerName, setPlayerName }) {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Group controlId="playerId">
        <Form.Label>Enter your name</Form.Label>
        <Form.Control
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </Form.Group>
    </Form>
  )
}

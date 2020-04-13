import React from "react"
import { Form, Button } from "react-bootstrap"

export default function FormCreate({ createGame, setNumPlayers }) {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <h2>Create a game:</h2>
      <Form.Group controlId="createRoom">
        <Form.Label>Create a rummikub game</Form.Label>
        <Form.Row>
          <Form.Label>Number of players</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setNumPlayers(e.target.value)}
          >
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </Form.Control>
        </Form.Row>
        <Button variant="primary" onClick={createGame}>
          Create Game
        </Button>
      </Form.Group>
    </Form>
  )
}

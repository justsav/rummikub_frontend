import { Server } from 'boardgame.io/server'
import { FlatFile } from 'boardgame.io/server'
import Rummikub from './src/Rummikub'

const server = Server({
  games: [Rummikub],
  db: new FlatFile({
    dir: './gameDb',
    logging: true
  })
})

server.run(8001, () => console.log("server running"))
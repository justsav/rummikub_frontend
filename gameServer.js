import { Server } from 'boardgame.io/server'
import { FlatFile } from 'boardgame.io/server'
import Rummikub from './src/Rummikub'

const server = Server({
  games: [Rummikub],
  // db: new FlatFile({
  //   dir: './gameDb',
  //   logging: true
  // })
})

const lobbyConfig = {

}

server.run({ port: 8001 , lobbyConfig})
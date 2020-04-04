// const Server = require('boardgame.io/server').Server
// const FlatFile = require('boardgame.io/server').FlatFile
// const Rummikub = require('./src/Rummikub')

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
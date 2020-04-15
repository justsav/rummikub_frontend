[![RummiKlub](https://github.com/kiloplatoon/rummikub_frontend/blob/master/src/static/logo.svg)](http://rummiklub.netlify.com)

# RummiKlub
> Online multiplayer clone of the Rummikub board game

## Local development installation
* `npm install` or `yarn install`

## Running dev server
* `yarn start`
* `yarn server`

## Testing before opening a pull request
* `yarn test`

## Deployment steps
* `git push rummiklub-game-server master:master`
* `yarn build && netlify deploy --dir build`
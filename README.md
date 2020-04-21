![logo](https://user-images.githubusercontent.com/5489258/79811720-5b399c00-833c-11ea-8cbf-59adfb06acf5.png)
## Welcome to Rummi-klub

An adaptation of the popular table-top tile game "Rummikub" using React and Node JS, leveraging React Drag 'n Drop and boardgame<span></span>.io libraries.

>[Play Rummikub Now](http://rummiklub.netlify.com)

>[More Information Here](https://github.com/justsav/rummikub_frontend/files/4506959/meet-rummiklub.pdf)

![Screen Shot 2020-04-17 at 20 42 57](https://user-images.githubusercontent.com/5489258/79811194-ba96ac80-833a-11ea-9d70-e643934274c6.png)
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

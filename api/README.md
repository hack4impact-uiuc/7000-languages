# API

This folder contains the backend api of the application.

## Environments

There are three environments that the backend runs in: `production`, `dev`, and `test`, each with their own database. `production` is set on deployment, `dev` is set whenever running locally, and `test` is set when tests are running. These environments are automatically set based on the task.

## Install & Run

To set up, first `cd` into this directory. Then,

```bash
yarn start
```

This will create a server on [http://localhost:9000](http://localhost:9000).

## Technologies

Built with [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/).

### Code Style

Use [ESLint](https://eslint.org) with [Prettier](https://prettier.io/).

## Testing

The unit tests are written with [Jest](https://jestjs.io/) and [SuperTest](https://github.com/visionmedia/supertest).

To test,

```bash
yarn test
```

If you are recieving the warning about [mismatched binaries](https://github.com/nodenv/nodenv/wiki/FAQ#npm-warning-about-mismatched-binaries), run

```bash
npm config set scripts-prepend-node-path auto
```

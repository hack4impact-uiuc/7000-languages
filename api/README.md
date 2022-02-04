# 7000 Languages API

This folder contains the backend api of the application.

## Environments

There are three environments that the backend runs in: `production`, `dev`, and `test`, each with their own database. `production` is set on deployment, `dev` is set whenever running locally, and `test` is set when tests are running. These environments are automatically set based on the task.

_As of 02/04/2022, only the dev environment is available._

## Getting Started

First, make sure you have [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed.

Also, make sure you have [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) installed.

Next, run `cd api` to move to this directory.

To install all of the required node packages, run:

```bash
yarn install
```

Then, set the necessary environment variables in the `.env` file. 

Finally, run:

```bash
yarn start
```
This will create a server on [http://localhost:9000](http://localhost:9000).

## Run

To run the API at any future time, use the following command:

```bash
yarn start
```

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

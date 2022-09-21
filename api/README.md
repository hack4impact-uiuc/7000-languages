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

Then, set the necessary environment variables by creating a `development.env` file in the `api` folder. Populate the file with the following:

```
NODE_ENV=development
PORT=3000
MONGO_URL=
IOS_CLIENT_ID=
ANDROID_CLIENT_ID=
```

You can obtain `MONGO_URL` by [creating a MongoDB Atlas Database](https://www.mongodb.com/atlas) and the `IOS_CLIENT_ID` and `ANDROID_CLIENT_ID` by creating [Google OAuth credentials](https://console.cloud.google.com/apis/credentials?pli=1).

Finally, run:

```bash
yarn start
```

This will create a server on [http://localhost:3000](http://localhost:3000).

## Run

To run the API at any future time, use the following command:

```bash
yarn start
```

Before commiting and pushing code to the remote repository, run the command below for linting and formatting:

```bash
yarn style
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

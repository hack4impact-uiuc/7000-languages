# 7000 Languages Client

This folder contains the frontend client of the application.

## Getting Started

First, make sure you have [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed.

Also, make sure you have [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) installed.

Next, install the [expo-cli](https://docs.expo.dev) with the following command:
```bash
yarn global add expo-cli
```

To install all of the required node packages, run:

```bash
yarn install
```

Then, set the necessary environment variables by creating a `.env` file in the `client` folder. Populate the file with the following:
```
API_PORT=3000
IOS_CLIENT_ID=
ANDROID_CLIENT_ID=
```

You can obtain `IOS_CLIENT_ID` and `ANDROID_CLIENT_ID` by creating [Google OAuth credentials](https://console.cloud.google.com/apis/credentials?pli=1).

Finally, run:

```bash
expo start
```

This will start Metro Bundler, which is an HTTP server that compiles the JavaScript code of our app using Babel and serves it to the Expo app. It also pops up Expo Dev Tools, a graphical interface for Expo CLI.
 
You will have the open to run the app on a connected device via USB, [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/), [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/), or on your own phone through the [Expo Go](https://expo.dev/client) app. I recommend using the Expo Go for day-to-day dev work, and your own device or simulator for checking features.

## Run

To set up, first `cd` into this directory. Then,

```bash
expo start
```

Before commiting and pushing code to the remote repository, run the command below for linting and formatting:

```bash
yarn style
```
## Technologies

Built with [React Native](https://reactnative.dev/).

### Code Style

Use [ESLint](https://eslint.org) with [Prettier](https://prettier.io/) and the [Airbnb Javascript Style Guide](https://github.com/airbnb/javascript).

To run, `yarn lint` and `yarn format` in the directory.

### Type Checking

Use [Flow](https://flow.org/) for type checking.

To run, `yarn flow` in the directory.

import { LogBox } from 'react-native'

// See https://stackoverflow.com/questions/41146446/get-rid-of-remote-debugger-is-in-a-background-tab-warning-in-react-native
// for more context
// eslint-disable-next-line no-unused-expressions
LogBox?.ignoreLogs(['Remote debugger'])
// LogBox?.ignoreLogs(['EventEmitter.remove()'])

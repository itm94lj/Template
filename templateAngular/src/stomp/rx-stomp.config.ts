import {RxStompConfig} from "@stomp/rx-stomp";

export const myRxStompConfig: RxStompConfig = {
  // Which Server?
  brokerURL: 'ws://127.0.0.1:8080/stomp',

  // Headers
  // Typical keys: login, passcode, host
  connectHeaders: {
    login: 'itm94lj@163.com',
    passcode: '000000',
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 500 (500 milliseconds)
  reconnectDelay: 500,

  // Will log diagnostics on console
  // It can be quite verbose, not recommended in production
  // Skip this key to stop logging to console
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }
}

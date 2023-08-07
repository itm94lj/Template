import {RxStompConfig} from "@stomp/rx-stomp/esm6/rx-stomp-config";
/**
 * Created by fenggu on 2023/8/3.
 */


export const myRxStompConfig: RxStompConfig = {
  brokerURL: 'ws://www.gateway.com:8777/greeting-service/greet-websocket',

  connectHeaders: {
    login: 'guest',
    passcode: 'guest',
  },

  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,

  reconnectDelay: 200,

  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },
};

import {RxStompService} from "./rx-stomp.service";
import {myRxStompConfig} from "../config/rxstomp-config";
/**
 * Created by fenggu on 2023/8/3.
 */

export function rxStompServiceFactory() {
  const rxStomp = new RxStompService();
  rxStomp.configure(myRxStompConfig);
  rxStomp.activate();
  return rxStomp;
}

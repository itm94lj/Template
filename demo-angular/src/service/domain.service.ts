import {RxStompService} from "./rx-stomp.service";
import { RxStomp, IMessage } from "@stomp/rx-stomp";
import { Subject, Observable, merge } from "rxjs";
import {DomainEvent} from "../entity/DomainEvent";
import {Domain} from "../entity/Domain";
/**
 * Created by fenggu on 2023/8/3.
 */
export class DomainService<Type extends Domain > {
  domainSubjectMap: Map<number, Subject<Type|null>>;

  constructor(private _rxStompService: RxStompService) {
    this.domainSubjectMap = new Map<number, Subject<Type|null>>();
  }

  getDomainName(): string {
    return 'Domain';
  }

  getDomainById(id: number): Observable<Type|null> {
    return new Subject<Type>().asObservable();
  }

  watchDomainById(id: number): Observable<Type|null> {
    const destination = '/topic/' + this.getDomainName();

    if (!this.domainSubjectMap.has(id)) {
      const domainSubject = new Subject<Type|null>();

      this._rxStompService.watch(destination)
        .subscribe((msg: IMessage) => {
          const domainEvent: DomainEvent<Type> = JSON.parse(msg.body);

          console.log('DomainEvent:', domainEvent);

          if ((domainEvent.domain) &&
              (domainEvent.domain.id === id)) {
            let newDomain = null;
            if ((domainEvent.domainEventType === 'DOMAIN_EVENT_TYPE_CREATE') ||
              (domainEvent.domainEventType === 'DOMAIN_EVENT_TYPE_UPDATE')) {
              console.log('update new domain of id:[', domainEvent.domain.id, '].');
              newDomain  = domainEvent.domain;

            } else if (domainEvent.domainEventType === 'DOMAIN_EVENT_TYPE_DELETE') {
              console.log('delete domain of id:[', domainEvent.domain.id, '].');
            }

            domainSubject.next(newDomain);
          }
        });

      this.domainSubjectMap.set(id, domainSubject);
    }

    const domainObservable       = this.getDomainById(id);
    const domainChangeObservable = this.domainSubjectMap.get(id)!.asObservable();

    return merge(domainObservable, domainChangeObservable);
  }
}

/**
 * Created by fenggu on 2023/8/3.
 */
export interface DomainEvent<Type> {
  domainEventType: string;
  domain: Type;
}

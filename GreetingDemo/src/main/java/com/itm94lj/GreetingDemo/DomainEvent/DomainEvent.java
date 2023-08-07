package com.itm94lj.GreetingDemo.DomainEvent;

public class DomainEvent<T> {
    DomainEventType domainEventType;
    T domain;
    String destination;

    public DomainEvent(DomainEventType domainEventType, T domain) {
        this.domainEventType = domainEventType;
        this.domain          = domain;
        this.destination     = "/topic/" + this.domain.getClass().getSimpleName();
    }

    public DomainEventType getDomainEventType() {
        return domainEventType;
    }

    public void setDomainEventType(DomainEventType domainEventType) {
        this.domainEventType = domainEventType;
    }

    public T getDomain() {
        return domain;
    }

    public void setDomain(T domain) {
        this.domain = domain;
    }

    public String getDestination() {
        return destination;
    }
}

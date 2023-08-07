package com.itm94lj.GreetingDemo.service;

import com.itm94lj.GreetingDemo.DomainEvent.DomainEvent;
import com.itm94lj.GreetingDemo.DomainEvent.DomainEventType;
import com.itm94lj.GreetingDemo.entity.Person;
import com.itm94lj.GreetingDemo.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PersonService {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private PersonRepository personRepository;

    public Optional<Person> getPersonById(Long id) {
        return personRepository.findById(id);
    }
    public Page<Person> getPagePersons(Pageable pageable) {
        return personRepository.findAll(pageable);
    }

    public Person updatePerson(Person person) {


        Optional<Person> findResult = Optional.empty();

        if (person.getId() != null) {
            findResult = getPersonById(person.getId());
        }

        DomainEvent<Person> domainEvent;

        personRepository.save(person);

        if (findResult.isEmpty()) {
            domainEvent = new DomainEvent<Person>(DomainEventType.DOMAIN_EVENT_TYPE_CREATE, person);
        } else {
            domainEvent = new DomainEvent<Person>(DomainEventType.DOMAIN_EVENT_TYPE_UPDATE, person);
        }

        System.out.println("send domain event destination:" + domainEvent.getDestination() +
        "type:" + domainEvent.getDomainEventType());
        this.simpMessagingTemplate.convertAndSend(
                domainEvent.getDestination(),
                domainEvent
        );

        return person;
    }

    public Optional<Person> deletePersonById(Long id) {
        DomainEvent<Person> domainEvent;

        Optional<Person> findResult = getPersonById(id);
        if (!findResult.isEmpty()) {
            personRepository.delete(findResult.get());
            domainEvent = new DomainEvent<Person>(DomainEventType.DOMAIN_EVENT_TYPE_DELETE, findResult.get());
            this.simpMessagingTemplate.convertAndSend(
                    domainEvent.getDestination(),
                    domainEvent
            );
        }

        return findResult;
    }
}

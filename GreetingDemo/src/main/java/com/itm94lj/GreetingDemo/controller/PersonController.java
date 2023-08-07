package com.itm94lj.GreetingDemo.controller;

import com.itm94lj.GreetingDemo.DomainEvent.DomainEvent;
import com.itm94lj.GreetingDemo.DomainEvent.DomainEventType;
import com.itm94lj.GreetingDemo.entity.Person;
import com.itm94lj.GreetingDemo.repository.PersonRepository;
import com.itm94lj.GreetingDemo.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class PersonController {

    @Autowired
    PersonService personService;

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @GetMapping("/persons")
    Page<Person> getPagePersons(@PageableDefault(size=10) Pageable pageable) {
        return personService.getPagePersons(pageable);
    }

    @GetMapping("/person")
    Optional<Person> getPerson(@RequestParam("id")Long id) {
        return personService.getPersonById(id);
    }

    @PostMapping("/person")
    Person updatePerson(@RequestBody Person person) {

        personService.updatePerson(person);

        return person;
    }

    @DeleteMapping("/person/{id}")
    Optional<Person> deletePerson(@PathVariable("id") Long id)
    {

        Optional<Person> person = personService.deletePersonById(id);

        return person;
    }
}

package com.itm94lj.GreetingDemo.repository;

import com.itm94lj.GreetingDemo.entity.Person;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface PersonRepository extends Repository<Person, Long> {
    Page<Person> findAll(Pageable pageable);
    Person findByName(String name);

    Optional<Person> findById(Long id);

    Person save(Person person);

    void delete(Person person);
}

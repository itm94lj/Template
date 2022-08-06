package com.itm94lj.template.repository;

import com.itm94lj.template.greeting.Greeting;
import org.springframework.data.repository.Repository;

@org.springframework.stereotype.Repository
public interface GreetingRepository extends Repository<Greeting, Long> {
    Iterable<Greeting> findAll();
    Greeting save(Greeting entity);
}

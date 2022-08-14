package com.itm94lj.template.entity.greeting;

import org.springframework.stereotype.Component;

import javax.persistence.Entity;
import javax.persistence.Id;

@Component
@Entity
public class Greeting {
    @Id
    private final Long id;
    private final String content;

    public Greeting() {
        this.id = 0L;
        this.content = "Hello";
    }

    public Greeting(Long id, String content) {
        this.id = id;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }
}

package com.itm94lj.template.controller.greeting;

import com.itm94lj.template.entity.greeting.Greeting;
import com.itm94lj.template.repository.GreetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class GreetingController {
    private static final String template = "Hello, %s";
    private final AtomicLong counter = new AtomicLong();

    @Autowired
    GreetingRepository greetingRepository;

    @Autowired
    private SimpMessagingTemplate sendTemplate;

    @GetMapping("/hello/greeting")
    @CrossOrigin(origins="*" , maxAge = 3600,
     allowedHeaders = {"x-auth-token", "x-requested-with", "x-xsrf-token"})
    public Greeting greeting(@RequestParam(value = "name", defaultValue="World") String name,
                             HttpServletRequest request) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        String username = authentication.getName();
        Object principal = authentication.getPrincipal();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Greeting last = new Greeting(counter.incrementAndGet(), String.format(template, name));

        greetingRepository.save(last);

        this.sendTemplate.convertAndSend("/domain/greeting", last);

        return last;
    }

    @GetMapping("/hello/allgreetings")
    public Collection<? extends Greeting> allGreetings() {
        Collection<? extends  Greeting> allGreetings = greetingRepository.findAll();

        return allGreetings;
    }

    @MessageMapping("/greeting")
    @SendTo("/domain")
    public String handle(String greeting) {
        System.out.println("process message mapping /greeting");
        return "[" + Timestamp.valueOf(LocalDateTime.now()) + ":" + greeting;
    }


}

package com.itm94lj.template.greeting;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Collection;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class GreetingController {
    private static final String template = "Hello, %s";
    private final AtomicLong counter = new AtomicLong();

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
        System.out.println("username:[" + username +"].");
        System.out.println("principal:[" + principal + "].");
        System.out.println("authorities:[" + authorities + "].");


        System.out.println("user principal:[" + request.getUserPrincipal() + "]");
        System.out.println("greeting invoked.");
        return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }

    @GetMapping("/hello/admingreeting")
    @CrossOrigin(origins="*" , maxAge = 3600,
            allowedHeaders = {"x-auth-token", "x-requested-with", "x-xsrf-token"})
    public Greeting admingreeting(@RequestParam(value = "name", defaultValue="World") String name) {
        System.out.println("admin greeting invoked.");
        return new Greeting(counter.incrementAndGet(), String.format(template, "ADMIN"));
    }
}

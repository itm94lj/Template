package com.itm94lj.OAuth2Server.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class UserController {

    @RequestMapping("/userinfo1")
    public Principal user(Principal user) {
        System.out.println("userinfo invoked.");
        return user;
    }

    @RequestMapping("/hello")
    public String hello() {
        System.out.println("Hello invoked.");
        return "Hello";
    }
}

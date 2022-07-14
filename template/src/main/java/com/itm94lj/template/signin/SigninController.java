package com.itm94lj.template.signin;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;

@RestController
public class SigninController {
    @GetMapping("/hello/user")
    public Principal signin(Principal user)
    {
        System.out.println("signin principal:" + user);
        return user;
    }

    @GetMapping("/hello/logout")
    public void logout()
    {
        System.out.println("logout invoked.");
        return ;
    }
}
